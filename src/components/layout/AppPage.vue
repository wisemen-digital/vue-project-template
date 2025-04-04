<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { VcBreadcrumbs } from '@wisemen/vue-core'
import {
  computed,
  useSlots,
} from 'vue'

import AppPageContainer from '@/components/layout/AppPageContainer.vue'
import { TEST_ID } from '@/constants/testId.constant'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[]
  }>(),
  { breadcrumbs: () => [] },
)

const slots = useSlots()

const hasTabsSlot = computed<boolean>(() => slots.tabs !== undefined)
</script>

<template>
  <main class="bg-primary flex min-h-dvh w-full flex-1 flex-col">
    <header
      :style="{
        viewTransitionName: 'page-header',
      }"
      class="bg-primary sticky top-0 z-10"
    >
      <AppPageContainer class="pt-4xl pb-0">
        <VcBreadcrumbs
          v-if="props.breadcrumbs.length > 0"
          :style="{
            viewTransitionName: 'page-breadcrumbs',
          }"
          :items="props.breadcrumbs"
          class="-ml-xxs"
        />

        <div class="flex min-h-10 items-center justify-between">
          <h1
            :data-test-id="TEST_ID.APP_PAGE.TITLE"
            :style="{
              viewTransitionName: 'page-title',
            }"
            class="text-display-xs text-primary font-semibold"
          >
            {{ props.title }}
          </h1>

          <div
            id="header-actions"
            class="gap-xl flex items-center justify-end"
          >
            <slot name="header-actions" />
          </div>
        </div>

        <div
          v-if="hasTabsSlot"
          class="mt-xl"
        >
          <slot name="tabs" />
        </div>
      </AppPageContainer>
    </header>

    <AppPageContainer class="pb-4xl pt-4xl flex flex-1 flex-col overflow-hidden">
      <slot />
    </AppPageContainer>
  </main>
</template>

<style>
::view-transition-group(page-header) {
  animation-duration: 0.2s;
}

::view-transition-group(page-header-border-bottom) {
  animation-duration: 0.2s;
}

::view-transition-group(page-title) {
  animation-duration: 0.2s;
}

::view-transition-old(page-title) {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

::view-transition-new(page-title) {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

::view-transition-group(header-action-primary) {
  animation-duration: 0.2s;
}

::view-transition-new(header-action-primary) {
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}

::view-transition-old(header-action-primary) {
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}
</style>
