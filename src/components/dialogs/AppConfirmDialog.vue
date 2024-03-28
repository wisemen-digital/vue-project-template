<script setup lang="ts">
import {
  AppButton,
  AppDialog,
  AppDialogDescription,
  AppDialogTitle,
  AppText,
} from '@wisemen/vue-core'

const props = defineProps<{
  description: string
  title: string
}>()

const emit = defineEmits<{
  confirm: []
}>()

function onConfirm(): void {
  emit('confirm')
}
</script>

<template>
  <AppDialog>
    <div class="w-dialog p-6">
      <AppDialogTitle>
        <AppText
          variant="title"
          as="h1"
        >
          {{ props.title }}
        </AppText>
      </AppDialogTitle>

      <AppDialogDescription>
        <AppText variant="body">
          This action cannot be undone.
        </AppText>
      </AppDialogDescription>

      <AppButton @click="onConfirm">
        Ok
      </AppButton>
    </div>
  </AppDialog>
</template>
