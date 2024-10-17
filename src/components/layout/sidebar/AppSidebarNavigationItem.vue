<script setup lang="ts">
import { AppIcon, AppTooltip } from '@wisemen/vue-core'

import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'
import type { NavigationItem } from '@/types/navigationItem.type.ts'

const props = defineProps<{
  isCollapsed: boolean
  item: NavigationItem
}>()
</script>

<template>
  <AppTooltip
    :is-hidden="!props.isCollapsed && props.item.keyboardShortcut === undefined"
    :offset-in-px="10"
    :delay-duration="500"
    side="right"
  >
    <template #trigger>
      <AppTypedRouterLink
        v-slot="{ isActive }"
        :to="props.item.to"
        class="group block rounded-xl ring-fg-brand-primary !ring-offset-1"
      >
        <div
          :class="[
            isActive ? 'bg-fg-brand-primary text-primary-on-brand hover:brightness-90' : 'bg-secondary text-quaternary group-hover:bg-secondary-hover',
          ]"
          class="flex h-12 items-center overflow-hidden rounded-xl px-lg duration-300"
        >
          <div class="relative">
            <AppIcon
              :icon="props.item.icon"
              size="lg"
            />

            <div
              v-if="props.item.hasAlertDot ?? false"
              class="absolute right-[-5px] top-[-5px] size-[5px] rounded-full bg-fg-error-primary"
            />
          </div>

          <div class="relative size-full overflow-hidden">
            <Transition
              enter-active-class="duration-300"
              leave-active-class="duration-300"
              enter-from-class="opacity-0 -translate-x-4"
              leave-to-class="opacity-0 -translate-x-4"
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
      </AppTypedRouterLink>
    </template>

    <template #content>
      <div class="flex items-center p-md">
        <span class="text-xs">
          {{ props.item.label }}
        </span>
      </div>
    </template>
  </AppTooltip>
</template>
