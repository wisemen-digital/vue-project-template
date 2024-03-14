import type { ComputedRef, Ref } from 'vue'
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

import { useModal } from '@/composables/modal/modal.composable'
import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'
import { deepClone } from '@/utils/object.util.ts'

interface UnsavedChanges<T> {
  handleUnsavedClose: (callback: () => void) => void
  isChanged: Ref<boolean>
  setSnapshot: (object: T | null) => void
}

export function useUnsavedChanges<T>(currentObject: ComputedRef<T>): UnsavedChanges<T> {
  const objectSnapshot = ref<T>()
  const router = useRouter()

  const confirmModal = useModal({
    component: () => import('@/components/app/AppConfirmModal.vue'),
  })

  const isChanged = computed<boolean>(() => {
    if (objectSnapshot.value === undefined) {
      return false
    }

    const currentObjectString = JSON.stringify(currentObject.value)?.replace(/""/g, 'null')
    const snapshotString = JSON.stringify(objectSnapshot.value)?.replace(/""/g, 'null')

    return currentObjectString !== snapshotString
  })

  function setSnapshot(object: T | null): void {
    if (object === undefined || object === null) {
      return
    }

    objectSnapshot.value = deepClone(object)
  }

  function handleUnsavedClose(callback: () => void): void {
    if (isChanged.value) {
      void confirmModal.openModal({
        description: i18nPlugin.global.t('shared.unsaved_changes_description'),
        onConfirm: () => {
          confirmModal.closeModal()
          objectSnapshot.value = undefined
          callback()
        },
        title: i18nPlugin.global.t('shared.unsaved_changes_title'),
      })
      return
    }

    callback()
  }

  function handleRouteLeave(to: RouteLocationNormalized): void {
    handleUnsavedClose(async () => {
      objectSnapshot.value = undefined
      await router.push({
        name: to.name ?? undefined,
        params: to.params,
        query: to.query,
      })
    })
  }

  onBeforeRouteLeave((to, _, next) => {
    if (isChanged.value) {
      handleRouteLeave(to)
      return
    }

    next()
  })

  onUnmounted(() => {
    window.onbeforeunload = null
  })

  onMounted(() => {
    window.onbeforeunload = (e): null | string => {
      if (isChanged.value) {
        e = e ?? window.event

        if (e !== undefined && e !== null) {
          e.returnValue = i18nPlugin.global.t('shared.unsaved_changes_description')
        }

        return i18nPlugin.global.t('shared.unsaved_changes_description')
      }

      return null
    }
  })

  return {
    handleUnsavedClose,
    isChanged,
    setSnapshot,
  }
}
