<script setup lang="ts">
import AppSidebarNavMenuGroup from '@/components/layout/sidebar/navigation/AppSidebarNavMenuGroup.vue'
import AppSidebarNavMenuItem from '@/components/layout/sidebar/navigation/AppSidebarNavMenuItem.vue'
import type {
  NavigationGroup,
  NavigationItem,
} from '@/types/navigationItem.type'

const props = defineProps<{
  isCollapsed: boolean
  bottomItems: NavigationItem[]
  mainItems: NavigationGroup[]
  sidebarItemHeightInRem: number
  sidebarItemIconSizeInRem: number
  sidebarItemPaddingXInRem: number
}>()
</script>

<template>
  <nav class="flex h-full flex-col justify-between">
    <div class="gap-y-xl flex flex-col">
      <AppSidebarNavMenuGroup
        v-for="group of props.mainItems"
        :key="group.label"
        :group="group"
        :is-collapsed="props.isCollapsed"
        :sidebar-item-icon-size-in-rem="props.sidebarItemIconSizeInRem"
        :sidebar-item-padding-x-in-rem="props.sidebarItemPaddingXInRem"
        :sidebar-item-height-in-rem="props.sidebarItemHeightInRem"
      >
        <template #item-right="{ item, isActive }">
          <slot
            :item="item"
            :is-active="isActive"
            :is-collapsed="isCollapsed"
            name="item-right"
          />
        </template>
      </AppSidebarNavMenuGroup>
    </div>

    <div class="gap-y-xl flex flex-col">
      <AppSidebarNavMenuItem
        v-for="item of props.bottomItems"
        :key="item.label"
        :item="item"
        :is-collapsed="props.isCollapsed"
        :sidebar-item-icon-size-in-rem="props.sidebarItemIconSizeInRem"
        :sidebar-item-padding-x-in-rem="props.sidebarItemPaddingXInRem"
        :sidebar-item-height-in-rem="props.sidebarItemHeightInRem"
      >
        <template #item-right="{ isActive }">
          <slot
            :item="item"
            :is-active="isActive"
            :is-collapsed="isCollapsed"
            name="item-right"
          />
        </template>
      </appsidebarnavmenuitem>
    </div>
  </nav>
</template>
