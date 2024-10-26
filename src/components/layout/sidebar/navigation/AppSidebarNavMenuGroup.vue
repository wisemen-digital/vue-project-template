<script setup lang="ts">
import AppSidebarNavMenuItem from '@/components/layout/sidebar/navigation/AppSidebarNavMenuItem.vue'
import type { NavigationGroup } from '@/types/navigationItem.type.ts'

const props = defineProps<{
  isCollapsed: boolean
  group: NavigationGroup
  sidebarItemHeightInPx: number
  sidebarItemIconSizeInPx: number
  sidebarItemPaddingXInPx: number
}>()
</script>

<template>
  <div class="py-md">
    <div class="relative h-4">
      <Transition
        enter-active-class="duration-500 ease-sidebar-collapse"
        leave-active-class="duration-500 ease-sidebar-collapse"
        enter-from-class="opacity-0 -translate-x-2  scale-[0.8]"
        leave-to-class="opacity-0 -translate-x-2 scale-[0.8]"
      >
        <h3
          v-if="!props.isCollapsed"
          class="absolute text-caption uppercase text-quaternary"
        >
          {{ props.group.label }}
        </h3>
      </Transition>
    </div>

    <ul class="my-md flex flex-col gap-y-md">
      <li
        v-for="item of props.group.items"
        :key="item.label"
      >
        <AppSidebarNavMenuItem
          :item="item"
          :is-collapsed="props.isCollapsed"
          :sidebar-item-icon-size-in-px="props.sidebarItemIconSizeInPx"
          :sidebar-item-padding-x-in-px="props.sidebarItemPaddingXInPx"
          :sidebar-item-height-in-px="props.sidebarItemHeightInPx"
        >
          <template #item-right="{ isActive }">
            <slot
              :item="item"
              :is-active="isActive"
              :is-collapsed="props.isCollapsed"
              name="item-right"
            />
          </template>
        </AppSidebarNavMenuItem>
      </li>
    </ul>
  </div>
</template>
