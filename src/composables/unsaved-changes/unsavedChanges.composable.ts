import { useDialog } from '@wisemen/vue-core'
import type { ComputedRef } from 'vue'
import {
  onMounted,
  onUnmounted,
} from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'

interface UseUnsavedChangesReturnType {
  handleUnsavedClose: (callback: () => void) => void
}

export function useUnsavedChanges(isDirty: ComputedRef<boolean>): UseUnsavedChangesReturnType {
  const confirmDialog = useDialog({
    component: () => import('@/components/dialog/AppConfirmDialog.vue'),
  })

  function handleUnsavedClose(callback: () => void): void {
    const { t } = i18nPlugin.global

    if (isDirty.value) {
      void confirmDialog.open({
        title: t('component.unsaved_changes_dialog.title'),
        isDestructive: true,
        cancelText: t('component.unsaved_changes_dialog.cancel'),
        confirmText: t('component.unsaved_changes_dialog.confirm'),
        description: t('component.unsaved_changes_dialog.description'),
        onConfirm: () => {
          confirmDialog.close()
          callback()
        },
      })

      return
    }

    callback()
  }

  onBeforeRouteLeave((_to, _from, next) => {
    if (isDirty.value) {
      handleUnsavedClose(() => {
        next()
      })

      return
    }

    next()
  })

  onUnmounted(() => {
    window.onbeforeunload = null
  })

  onMounted(() => {
    window.onbeforeunload = (): null | string => {
      if (isDirty.value) {
        return i18nPlugin.global.t('component.unsaved_changes_description')
      }

      return null
    }
  })

  return {
    handleUnsavedClose,
  }
}
