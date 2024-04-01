<script setup lang="ts">
import {
  AppIcon,
  AppTooltip,
} from '@wisemen/vue-core'

import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'
import { MenuItem } from '@/types/menuItem.type'

const props = defineProps<{
  items: MenuItem[]
}>()
</script>

<template>
  <nav class="mt-16">
    <ul class="flex flex-col items-center gap-y-2">
      <li
        v-for="item of props.items"
        :key="item.label"
      >
        <AppTooltip
          :content="item.label"
          :disable-close-on-trigger-click="true"
          side="right"
        >
          <AppTypedRouterLink
            v-slot="{ isActive }"
            :to="item.to"
            class="block rounded-button"
          >
            <div
              :class="[
                isActive ? 'bg-primary/5 text-primary' : 'text-muted-foreground',
              ]"
              class="flex size-10 items-center justify-center rounded-button"
            >
              <AppIcon
                :icon="item.icon"
                size="lg"
              />
            </div>
          </AppTypedRouterLink>
        </AppTooltip>
      </li>
    </ul>
  </nav>
</template>
