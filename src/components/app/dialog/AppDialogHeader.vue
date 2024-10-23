<script setup lang="ts">
import {
  AppDialogDescription,
  AppDialogTitle,
} from '@wisemen/vue-core'

const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <AppDialogTitle>
      <h1 class="text-heading font-semibold text-primary">
        {{ props.title }}
      </h1>
    </AppDialogTitle>

    <AppDialogDescription>
      <p class="mt-4 text-secondary">
        {{ props.description }}
      </p>
    </AppDialogDescription>
  </div>
</template>
