<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import {
  AppBreadcrumbs,
  AppContainer,
  AppText,
} from '@wisemen/vue-core'

import { TEST_ID } from '@/constants/testId.constant.ts'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[] | null
  }>(),
  {
    breadcrumbs: null,
  },
)
</script>

<template>
  <div
    id="app-page"
    class="flex w-full flex-1 flex-col bg-background"
  >
    <AppContainer class="pb-2 pt-10">
      <AppBreadcrumbs
        v-if="props.breadcrumbs !== null"
        :items="props.breadcrumbs"
        class="mb-1"
      />

      <div class="flex h-10 items-center justify-between">
        <AppText
          :data-testid="TEST_ID.APP_PAGE.TITLE"
          variant="title"
        >
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
