<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppDivider from '@/components/app/AppDivider.vue'
import AppButton from '@/components/app/button/AppButton.vue'
import AppModal from '@/components/app/modal/AppModal.vue'
import AppText from '@/components/app/text/AppText.vue'

const props = defineProps<{
  description: string
  isOpen: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const { t } = useI18n()

function onCloseButtonClick(): void {
  emit('close')
}

function onCancelButtonClick(): void {
  emit('close')
}

function onConfirmButtonClick(): void {
  emit('confirm')
}
</script>

<template>
  <AppModal
    :is-open="props.isOpen"
    @close="onCloseButtonClick"
  >
    <div class="max-w-md">
      <div class="space-y-2 p-4">
        <AppText
          class="font-medium"
          variant="body"
        >
          {{ props.title }}
        </AppText>
        <AppText variant="body">
          {{ props.description }}
        </AppText>
      </div>
      <AppDivider direction="horizontal" />
      <div class="flex items-center justify-end border border-border p-4">
        <AppButton
          variant="secondary"
          @click="onCancelButtonClick"
        >
          {{ t('shared.cancel') }}
        </AppButton>
        <AppButton @click="onConfirmButtonClick">
          {{ t('shared.confirm') }}
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>
