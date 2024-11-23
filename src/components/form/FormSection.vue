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
  <div class="grid gap-x-6xl gap-y-xl md:grid-cols-3">
    <div>
      <h2 class="font-medium text-primary">
        {{ props.title }}
      </h2>

      <p
        v-if="props.description !== null"
        class="mt-sm text-sm text-secondary"
      >
        {{ props.description }}
      </p>
    </div>

    <div class="col-span-2">
      <slot />
    </div>
  </div>
</template>
