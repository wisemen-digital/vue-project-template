<script setup lang="ts">
import { StyleUtil } from '@/utils/style.util'

const props = defineProps<{
  cols: 1 | 2 | 3 | 4
}>()
</script>

<template>
  <div
    :class="
      StyleUtil.cn({
        'grid-cols-1': props.cols === 1,
        'grid-cols-2': props.cols === 2,
        'grid-cols-3': props.cols === 3,
        'grid-cols-4': props.cols === 4,
      })
    "
    class="grid gap-xl"
  >
    <slot />
  </div>
</template>
