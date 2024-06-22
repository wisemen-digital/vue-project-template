<script setup lang="ts">
import AppConfirmDialog from '@/components/dialog/AppConfirmDialog.vue'

const props = defineProps<{
  title: string
  isDeactivating: boolean
  cancelText: string
  confirmText: string
  description: string
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
