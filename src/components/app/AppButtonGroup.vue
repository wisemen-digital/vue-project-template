<script setup lang="ts">
const props = withDefaults(defineProps<{
  justify?: 'center' | 'end' | 'start'
}>(), {
  justify: 'center',
})
</script>

<template>
  <div
    :style="{
      justifyContent: props.justify,
    }"
    class="flex items-center gap-x-2"
  >
    <slot />
  </div>
</template>
