<script setup lang="ts">
const props = defineProps<{
  cols: 1 | 2 | 3 | 4 | 5
}>()
</script>

<template>
  <div
    :class="{
      'grid-cols-1': props.cols === 1,
      'md:grid-cols-2': props.cols === 2,
      'lg:grid-cols-3': props.cols === 3,
      'xl:grid-cols-4': props.cols === 4,
      '2xl:grid-cols-5': props.cols >= 5,
    }"
    class="gap-xl grid"
  >
    <slot />
  </div>
</template>
