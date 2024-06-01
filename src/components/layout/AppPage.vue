<script setup lang="ts">
import {
  AppBreadcrumbs,
  AppContainer,
  AppText,
  BreadcrumbItem,
} from '@wisemen/vue-core'

const props = withDefaults(
  defineProps<{
    breadcrumbs?: BreadcrumbItem[] | null
    title: string
  }>(),
  {
    breadcrumbs: null,
  },
)
</script>

<template>
  <div class="flex w-full flex-1 flex-col bg-background">
    <AppContainer class="pb-2 pt-10">
      <AppBreadcrumbs
        v-if="props.breadcrumbs !== null"
        :items="props.breadcrumbs"
        class="mb-1"
      />

      <div class="flex h-10 items-center justify-between">
        <AppText variant="title">
          {{ props.title }}
        </AppText>

        <div
          id="header-actions"
          class="flex items-center justify-end gap-4"
        >
          <slot name="header-actions" />
        </div>
      </div>
    </AppContainer>

    <AppContainer class="flex flex-1 flex-col overflow-hidden pb-8 pt-6">
      <slot />
    </AppContainer>
  </div>
</template>
