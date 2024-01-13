<script setup lang="ts">
interface Props {
  src: string
  alt?: string | null
}

const { src, alt } = defineProps<Props>()

const emit = defineEmits<{
  'close': []
}>()

const { t } = useI18n()
</script>

<template>
  <AppModal @close="emit('close')">
    <div class="h-[80vh] w-[80vw]">
      <div class="absolute left-0 top-0 flex w-full justify-end p-4">
        <AppButton
          :href="src"
          variant="secondary"
          icon-right="link"
          class="h-9"
        >
          {{ t('core.open_in_new_tab') }}
        </AppButton>
      </div>

      <img
        :src="src"
        :alt="alt ?? undefined"
      >
    </div>
  </AppModal>
</template>
