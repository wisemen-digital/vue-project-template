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
          'h-full w-[1px]': props.direction === 'vertical',
        },
        { 'h-[1px] w-full': props.direction === 'horizontal' },
      )
    "
    role="presentation"
    class="bg-border"
  />
</template>
