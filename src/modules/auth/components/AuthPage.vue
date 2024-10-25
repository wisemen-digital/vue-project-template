<script setup lang="ts">
import { AppText } from '@wisemen/vue-core'

const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="grid h-screen grid-cols-1 lg:grid-cols-2">
    <div class="mx-auto flex w-full max-w-sm flex-col items-center justify-center">
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

      <div class="mt-6 flex w-full flex-col items-center">
        <slot />
      </div>
    </div>

    <div class="hidden bg-black lg:block" />
  </div>
</template>
