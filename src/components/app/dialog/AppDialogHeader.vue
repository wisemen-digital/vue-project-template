<script setup lang="ts">
import {
  AppDialogDescription,
  AppDialogTitle,
  AppText,
} from '@wisemen/vue-core'

const props = defineProps<{
  description: string
  title: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <AppDialogTitle>
      <AppText
        class="font-medium"
        variant="heading"
      >
        {{ props.title }}
      </AppText>
    </AppDialogTitle>

    <AppDialogDescription>
      <AppText
        class="mt-4"
        variant="body"
      >
        {{ props.description }}
      </AppText>
    </AppDialogDescription>
  </div>
</template>
