<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    description?: null | string
  }>(),
  {
    description: null,
  },
)
</script>

<template>
  <div class="grid gap-x-12 gap-y-4 md:grid-cols-3">
    <div>
      <h2 class="font-medium text-primary">
        {{ props.title }}
      </h2>

      <p
        v-if="props.description !== null"
        class="mt-1 text-subtext text-secondary"
      >
        {{ props.description }}
      </p>
    </div>

    <div class="col-span-2">
      <slot />
    </div>
  </div>
</template>
