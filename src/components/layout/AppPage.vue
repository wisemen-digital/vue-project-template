<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { VcBreadcrumbs } from '@wisemen/vue-core'
import { useRouter } from 'vue-router'

import AppContainer from '@/components/layout/AppContainer.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { BrowserUtil } from '@/utils/browser.util'

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadcrumbItem[]
  }>(),
  {
    breadcrumbs: () => [],
  },
)

const router = useRouter()

router.beforeResolve(() => {
  if (!BrowserUtil.hasSupportForViewTransition()) {
    return
  }

  let changeRoute: () => void
  const ready = new Promise<void>((resolve) => (changeRoute = resolve))

  document.startViewTransition(() => {
    changeRoute()
  })

  return ready
})
</script>

<template>
  <div class="flex w-full flex-1 flex-col">
    <AppContainer>
      <header class="border-b border-solid border-secondary pb-2xl">
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
      </header>
    </AppContainer>

    <AppContainer
      :style="{
        viewTransitionName: 'page-content',
      }"
      class="flex flex-1 flex-col overflow-hidden pb-xl pt-4xl"
    >
      <slot />
    </AppContainer>
  </div>
</template>

<style>
::view-transition-group(page-title) {
  animation-duration: 0.2s;
}

::view-transition-old(page-title) {
  animation-duration: 0.2s;
  height: 100%;
  width: 100%;
  object-fit: fill;
}

::view-transition-new(page-title) {
  animation-duration: 0.2s;
  height: 100%;
  width: 100%;
  object-fit: fill;
}

::view-transition-group(header-action) {
  animation-duration: 0.2s;
}

::view-transition-new(header-action) {
  animation-duration: 0.2s;
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}

::view-transition-old(header-action) {
  animation-duration: 0.2s;
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}
</style>
