<script setup lang="ts">
const props = withDefaults(defineProps<{
  isCursorDefault?: boolean
}>(), {
  isCursorDefault: false,
})
</script>

<template>
  <button
    :class="{
      'cursor-pointer': !props.isCursorDefault,
    }"
    type="button"
    class="outline-none ring-brand-primary-500 ring-offset-1 duration-200 focus-visible:ring-2"
  >
    <slot />
  </button>
</template>
