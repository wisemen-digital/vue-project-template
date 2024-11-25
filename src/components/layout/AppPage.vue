<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { VcBreadcrumbs } from '@wisemen/vue-core'

import AppContainer from '@/components/layout/AppContainer.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[]
  }>(),
  {
    breadcrumbs: () => [],
  },
)
</script>

<template>
  <main class="flex w-full flex-1 flex-col">
    <header class="bg-primary z-10 sticky top-0">
      <AppContainer class="py-xl">
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
            class="text-display-xs font-semibold text-primary"
          >
            {{ props.title }}
          </h1>

          <div
            id="header-actions"
            class="flex items-center justify-end gap-xl"
          >
            <slot name="header-actions" />
          </div>
        </div>
      </AppContainer>

      <!-- No border bottom to make sure it can be animated -->
      <div
        :style="{
          viewTransitionName: 'page-header-border-bottom',
        }"
        role="presentation"
        class="h-px w-full bg-quaternary"
      />
    </header>

    <AppContainer
      :style="{
        // viewTransitionName: 'page-content',
      }"
      class="flex flex-1 flex-col overflow-hidden pb-4xl pt-4xl"
    >
      <slot />
    </AppContainer>
  </main>
</template>

<style>
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

::view-transition-group(header-action) {
  animation-duration: 0.2s;
}

::view-transition-new(header-action) {
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}

::view-transition-old(header-action) {
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}
</style>
