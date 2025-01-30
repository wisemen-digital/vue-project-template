<script setup lang="ts">
import { VcIcon, VcTooltip } from '@wisemen/vue-core'

import AppRouterLink from '@/components/app/link/AppRouterLink.vue'
import type { NavigationItem } from '@/types/navigationItem.type'

const props = defineProps<{
  isCollapsed: boolean
  item: NavigationItem
  sidebarItemHeightInRem: number
  sidebarItemIconSizeInRem: number
  sidebarItemPaddingXInRem: number
}>()
</script>

<template>
  <VcTooltip
    :is-hidden="!props.isCollapsed && props.item.keyboardShortcut === undefined"
    :popover-offset-in-px="10"
    :is-arrow-hidden="true"
    :delay-duration="500"
    popover-side="right"
  >
    <template #trigger>
      <AppRouterLink
        v-slot="{ isActive }"
        :to="props.item.to"
        class="group block rounded-xl ring-fg-brand-primary"
      >
        <div
          :style="{
            paddingLeft: `${props.sidebarItemPaddingXInRem}rem`,
            paddingRight: `${props.sidebarItemPaddingXInRem}rem`,
            height: `${props.sidebarItemHeightInRem}rem`,
          }"
          :class="[
            isActive
              ? 'bg-fg-brand-primary text-primary-on-brand hover:brightness-95'
              : 'bg-secondary text-quaternary group-hover:bg-secondary-hover',
          ]"
          class="flex items-center overflow-hidden rounded-xl px-md duration-300"
        >
          <div class="relative">
            <VcIcon
              :style="{
                width: `${props.sidebarItemIconSizeInRem}rem`,
                height: `${props.sidebarItemIconSizeInRem}rem`,
              }"
              :icon="props.item.icon"
              class="shrink-0"
            />

            <div
              v-if="props.item.hasAlertDot ?? false"
              class="absolute right-[-4px] top-[-4px] size-[5px] rounded-full bg-fg-error-primary"
            />
          </div>

          <div class="relative size-full overflow-hidden">
            <Transition
              enter-active-class="not-motion-reduce:duration-500 ease-sidebar-collapse"
              leave-active-class="not-motion-reduce:duration-500 ease-sidebar-collapse"
              enter-from-class="opacity-0 scale-[0.8] -translate-x-4"
              leave-to-class="opacity-0 scale-[0.8] -translate-x-4"
            >
              <div
                v-if="!props.isCollapsed"
                class="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-between whitespace-nowrap pl-xl"
              >
                <span
                  :class="[
                    isActive ? 'font-medium' : 'font-normal',
                  ]"
                >
                  {{ props.item.label }}
                </span>

                <slot
                  :item="props.item"
                  :is-active="isActive"
                  :is-collapsed="props.isCollapsed"
                  name="item-right"
                />
              </div>
            </Transition>
          </div>
        </div>
      </AppRouterLink>
    </template>

    <template #content>
      <div class="flex items-center px-md py-sm">
        <span class="text-xs text-white">
          {{ props.item.label }}
        </span>
      </div>
    </template>
  </VcTooltip>
</template>
