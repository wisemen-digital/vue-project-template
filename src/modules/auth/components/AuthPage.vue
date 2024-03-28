<script setup lang="ts">
import { AppText } from '@wisemen/vue-core'

const props = defineProps<{
  description: string
  title: string
}>()
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center pb-24">
    <AppText
      class="font-medium text-foreground"
      variant="title"
    >
      {{ props.title }}
    </AppText>

    <AppText
      class="mt-2"
      variant="subtext"
    >
      {{ props.description }}
    </AppText>

    <div class="mt-6 w-full">
      <slot />
    </div>
  </div>
</template>
