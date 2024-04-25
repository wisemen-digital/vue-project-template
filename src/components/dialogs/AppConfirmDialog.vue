<script setup lang="ts">
import { AppDialog } from '@wisemen/vue-core'

import AppDialogActionCancel from '@/components/app/dialog/AppDialogActionCancel.vue'
import AppDialogActionPrimary from '@/components/app/dialog/AppDialogActionPrimary.vue'
import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'

const props = withDefaults(defineProps<{
  cancelText: string
  confirmText: string
  description: string
  isDestructive: boolean
  isLoading?: boolean
  title: string
}>(), {
  isLoading: false,
})

const emit = defineEmits<{
  confirm: []
}>()

function onConfirm(): void {
  emit('confirm')
}
</script>

<template>
  <AppDialog>
    <AppDialogContent class="w-dialog-sm">
      <AppDialogHeader
        :title="props.title"
        :description="props.description"
        icon="alertCircle"
      />

      <AppDialogActions>
        <AppDialogActionCancel
          :label="props.cancelText"
          :is-disabled="props.isLoading"
        />

        <AppDialogActionPrimary
          :label="props.confirmText"
          :is-destructive="props.isDestructive"
          :is-loading="props.isLoading"
          @confirm="onConfirm"
        />
      </AppDialogActions>
    </AppDialogContent>
  </AppDialog>
</template>
