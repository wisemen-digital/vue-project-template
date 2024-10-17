<script setup lang="ts">
import AppSidebarNavigationItem from '@/components/layout/sidebar/AppSidebarNavigationItem.vue'
import type { NavigationGroup } from '@/types/navigationItem.type.ts'

const props = defineProps<{
  isCollapsed: boolean
  group: NavigationGroup
}>()
</script>

<template>
  <div>
    <div class="relative h-4">
      <Transition
        enter-active-class="duration-300"
        leave-active-class="duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
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
        <AppSidebarNavigationItem
          :item="item"
          :is-collapsed="props.isCollapsed"
        >
          <template #item-right="{ isActive }">
            <slot
              :item="item"
              :is-active="isActive"
              :is-collapsed="props.isCollapsed"
              name="item-right"
            />
          </template>
        </AppSidebarNavigationItem>
      </li>
    </ul>
  </div>
</template>
