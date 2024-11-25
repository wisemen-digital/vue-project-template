<script setup lang="ts">
import { AppDialogCloseButton } from '@wisemen/vue-core'

const props = withDefaults(
  defineProps<{
    size?: 'lg' | 'md' | 'sm'
  }>(),
  {
    size: 'md',
  },
)
</script>

<template>
  <div
    :class="{
      'w-[800px]': props.size === 'lg',
      'w-[600px]': props.size === 'md',
      'w-[400px]': props.size === 'sm',
    }"
    class="overflow-y-auto px-8 py-6"
  >
    <slot />

    <div class="absolute right-2 top-2">
      <AppDialogCloseButton />
    </div>
  </div>
</template>
