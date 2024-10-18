<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

import AppSidebarBottom from '@/components/layout/sidebar/AppSidebarBottom.vue'
import AppSidebarCollapseToggle from '@/components/layout/sidebar/AppSidebarCollapseToggle.vue'
import AppSidebarNavigationGroup from '@/components/layout/sidebar/AppSidebarNavigationGroup.vue'
import type {
  NavigationGroup,
  NavigationItem,
} from '@/types/navigationItem.type.ts'

const props = withDefaults(defineProps<{
  bottomItems?: NavigationItem[]
  logo: {
    alt: string
    src: string
  }
  mainItems: NavigationGroup[]
  variant: 'fixed-sidebar' | 'floating-content' | 'floating-sidebar'
}>(), {
  bottomItems: () => [],
})

const logoSm = 'W'
const logoLg = 'Wisemen'

const isCollapsed = useLocalStorage<boolean>('isSidebarCollapsed', false)

const collapsedSidebarWidth = computed<string>(() => {
  if (props.variant === 'fixed-sidebar') {
    return 'w-[89px]'
  }

  if (props.variant === 'floating-sidebar') {
    return 'w-[82px]'
  }

  return 'w-[80px]'
})
</script>

<template>
  <div
    :class="{
      'p-4': props.variant === 'floating-sidebar' || props.variant === 'floating-content',
      'bg-secondary': props.variant === 'floating-content',
    }"
    class="group/sidebar sticky top-0 h-dvh"
  >
    <div
      :class="[
        isCollapsed ? collapsedSidebarWidth : 'w-64',
        {
          'rounded-2xl border border-solid border-secondary': props.variant === 'floating-sidebar',
          'border-r border-solid border-secondary px-2xl': props.variant === 'fixed-sidebar',
        },
      ]"
      class="relative flex h-full flex-col justify-between bg-secondary duration-300 ease-in-out"
    >
      <AppSidebarCollapseToggle v-model="isCollapsed" />

      <div class="flex flex-col">
        <div class="pointer-events-none relative flex h-20 items-center justify-center p-xl font-medium uppercase tracking-widest text-primary">
          <Transition
            enter-active-class="duration-300"
            leave-active-class="duration-300"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <span
              v-if="isCollapsed"
              class="absolute left-1/2 -translate-x-1/2"
            >
              {{ logoSm }}
            </span>

            <span
              v-else
              class="absolute left-1/2 -translate-x-1/2"
            >
              {{ logoLg }}
            </span>
          </Transition>
        </div>

        <div class="overflow-y-auto p-xl">
          <nav class="flex flex-col gap-y-xl">
            <AppSidebarNavigationGroup
              v-for="group of props.mainItems"
              :key="group.label"
              :group="group"
              :is-collapsed="isCollapsed"
            >
              <template #item-right="{ item, isActive }">
                <slot
                  :item="item"
                  :is-active="isActive"
                  :is-collapsed="isCollapsed"
                  name="item-right"
                />
              </template>
            </AppSidebarNavigationGroup>
          </nav>
        </div>
      </div>

      <AppSidebarBottom :is-collapsed="isCollapsed" />
    </div>
  </div>
</template>
