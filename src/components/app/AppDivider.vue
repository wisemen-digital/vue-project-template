<script setup lang="ts">
import { cn } from '@/utils/style.util.ts'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
}>(), {
  direction: 'horizontal',
})
</script>

<template>
  <div
    :class="
      cn(
        {
          'h-full w-[1px]': props.direction === 'vertical',
        },
        { 'h-[1px] w-full': props.direction === 'horizontal' },
      )
    "
    role="presentation"
    class="bg-border"
  />
</template>
