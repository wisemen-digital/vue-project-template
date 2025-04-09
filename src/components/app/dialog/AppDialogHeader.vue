<script setup lang="ts">
import {
  VcDialogDescription,
  VcDialogTitle,
} from '@wisemen/vue-core-components'

const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <VcDialogTitle>
      <h1 class="text-primary text-lg font-semibold">
        {{ props.title }}
      </h1>
    </VcDialogTitle>

    <VcDialogDescription>
      <p class="mt-sm text-secondary">
        {{ props.description }}
      </p>
    </VcDialogDescription>
  </div>
</template>
