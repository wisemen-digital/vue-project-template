<script setup lang="ts">
import { AppText } from '@wisemen/vue-core'

const props = withDefaults(
  defineProps<{
    description?: null | string
    title: string
  }>(),
  {
    description: null,
  },
)
</script>

<template>
  <div class="grid gap-x-8 gap-y-4 lg:grid-cols-3">
    <div>
      <AppText
        class="font-medium"
        variant="body"
      >
        {{ props.title }}
      </AppText>

      <AppText
        v-if="props.description !== null"
        class="mt-1 text-muted-foreground"
        variant="subtext"
      >
        {{ props.description }}
      </AppText>
    </div>

    <div class="col-span-2">
      <slot />
    </div>
  </div>
</template>
