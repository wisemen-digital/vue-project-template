<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/app/button/AppButton.vue'
import AppModal from '@/components/app/modal/AppModal.vue'

const props = defineProps<{
  alt?: null | string
  src: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()
</script>

<template>
  <AppModal @close="emit('close')">
    <div class="h-[80vh] w-[80vw]">
      <div class="absolute left-0 top-0 flex w-full justify-end p-4">
        <AppButton
          :href="props.src"
          class="h-9"
          variant="secondary"
        >
          {{ t('components.image.open_in_new_tab') }}
        </AppButton>
      </div>

      <img
        :alt="props.alt ?? undefined"
        :src="props.src"
      >
    </div>
  </AppModal>
</template>
