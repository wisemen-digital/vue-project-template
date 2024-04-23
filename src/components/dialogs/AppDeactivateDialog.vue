<script setup lang="ts">
import AppConfirmDialog from '@/components/dialogs/AppConfirmDialog.vue'

const props = defineProps<{
  cancelText: string
  confirmText: string
  description: string
  isDeactivating: boolean
  title: string
}>()

const emit = defineEmits<{
  deactivate: []
}>()

function onConfirm(): void {
  emit('deactivate')
}
</script>

<template>
  <AppConfirmDialog
    :cancel-text="props.cancelText"
    :confirm-text="props.confirmText"
    :description="props.description"
    :title="props.title"
    :is-destructive="true"
    :is-loading="props.isDeactivating"
    @confirm="onConfirm"
  />
</template>
