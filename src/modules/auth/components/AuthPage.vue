<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex w-full flex-col pb-24">
    <h1 class="text-title font-semibold text-primary">
      {{ props.title }}
    </h1>

    <p class="mt-2 text-subtext">
      {{ props.description }}
    </p>

    <div class="mt-6 w-full">
      <slot />
    </div>
  </div>
</template>
