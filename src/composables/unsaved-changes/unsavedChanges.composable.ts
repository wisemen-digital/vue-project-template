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
    component: () => import('@/components/dialogs/AppConfirmDialog.vue'),
  })

  function handleUnsavedClose(callback: () => void): void {
    const { t } = i18nPlugin.global

    if (isDirty.value) {
      void confirmDialog.open({
        cancelText: t('components.unsaved_changes_dialog.cancel'),
        confirmText: t('components.unsaved_changes_dialog.confirm'),
        description: t('components.unsaved_changes_dialog.description'),
        isDestructive: true,
        onConfirm: () => {
          confirmDialog.close()
          callback()
        },
        title: t('shared.unsaved_changes_title'),
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
    window.onbeforeunload = (e): null | string => {
      if (isDirty.value) {
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
  }
}
