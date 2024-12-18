<script setup lang="ts">
const props = defineProps<{
  delayClass: string
}>()
</script>

<template>
  <Transition
    :appear="true"
    :enter-active-class="`duration-[750ms] ${props.delayClass}`"
    enter-from-class="opacity-0 translate-y-8 blur-lg scale-95"
  >
    <slot />
  </Transition>
</template>
