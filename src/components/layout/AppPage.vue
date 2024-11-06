<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { AppBreadcrumbs } from '@wisemen/vue-core'

import AppContainer from '@/components/layout/AppContainer.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[] | null
    subtitle?: null | string
  }>(),
  {
    breadcrumbs: null,
  },
)
</script>

<template>
  <div class="flex w-full flex-1 flex-col">
    <AppContainer class="pt-12">
      <AppBreadcrumbs
        v-if="props.breadcrumbs !== null"
        :items="props.breadcrumbs"
        class="mb-xl"
      />

      <div class="flex h-10 items-center justify-between">
        <div>
          <div
            :data-test-id="TEST_ID.APP_PAGE.TITLE"
            class="text-2xl font-semibold text-primary"
          >
            {{ props.title }}
          </div>
          <div>
            <span
              v-if="props.subtitle"
              class="text-sm text-secondary"
            >
              {{ props.subtitle }}
            </span>
          </div>
        </div>

        <div
          id="header-actions"
          class="flex items-center justify-end gap-4"
        >
          <slot name="header-actions" />
        </div>
      </div>
    </AppContainer>

    <AppContainer class="flex flex-1 flex-col overflow-hidden pb-xl pt-4xl">
      <slot />
    </AppContainer>
  </div>
</template>
