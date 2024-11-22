<script setup lang="ts">
import {
  VcDialogDescription,
  VcDialogTitle,
} from '@wisemen/vue-core'

const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <VcDialogTitle>
      <h1 class="text-heading font-semibold text-primary">
        {{ props.title }}
      </h1>
    </VcDialogTitle>

    <VcDialogDescription>
      <p class="mt-4 text-secondary">
        {{ props.description }}
      </p>
    </VcDialogDescription>
  </div>
</template>
