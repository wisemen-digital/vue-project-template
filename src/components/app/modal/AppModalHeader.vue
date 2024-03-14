<script setup lang="ts">
import AppButton from '@/components/app/button/AppButton.vue'
import AppIcon from '@/components/app/icon/AppIcon.vue'
import AppText from '@/components/app/text/AppText.vue'
import type { Icon } from '@/icons/icons'

const props = defineProps<{
  icon: Icon
  title: string
}>()

const emit = defineEmits<{ (event: 'close'): void }>()

function onCloseModal(): void {
  emit('close')
}
</script>

<template>
  <div class="flex items-center justify-between px-6 py-4">
    <div class="flex items-center gap-x-2">
      <div class="rounded-md border border-solid border-border p-2">
        <AppIcon
          :icon="props.icon"
          class="size-4"
        />
      </div>

      <AppText
        class="font-medium"
        variant="heading"
      >
        {{ props.title }}
      </AppText>
    </div>

    <AppButton
      class="size-8"
      icon-left="close"
      size="icon"
      variant="secondary"
      @click="onCloseModal"
    />
  </div>
</template>
