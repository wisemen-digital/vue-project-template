<script setup lang="ts">
import { StyleUtil } from '@/utils/style.util'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical'
}>(), {
  direction: 'horizontal',
})
</script>

<template>
  <div
    :class="
      StyleUtil.cn(
        {
          'h-full w-px': props.direction === 'vertical',
        },
        { 'h-px w-full': props.direction === 'horizontal' },
      )
    "
    role="presentation"
    class="bg-tertiary"
  />
</template>
