<script setup lang="ts">
import {
  AppIcon,
  AppText,
} from '@wisemen/vue-core'
import type { NavigationItemOption } from 'node_modules/@wisemen/vue-core/dist/types/navigationItem.type'

import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'

const props = defineProps<{
  isOpen: boolean
  navigationItem: NavigationItemOption
}>()

// const { t } = useI18n()
</script>

<template>
  <div>
    <AppTypedRouterLink
      v-slot="{ isActive }"
      :to="props.navigationItem.to"
      class="block rounded-button"
    >
      <div
        :class="[
          isActive ? 'bg-primary/5 text-primary' : 'text-muted-foreground',
          props.isOpen ? 'justify-start px-3' : 'justify-center',
        ]"
        class="flex h-10 w-full items-center  gap-3 rounded-button"
      >
        <AppIcon
          :icon="props.navigationItem.icon"
          size="lg"
        />
        <AppText
          v-if="props.isOpen"
          variant="subtext"
        >
          {{ props.navigationItem.label }}
        </AppText>
      </div>
    </AppTypedRouterLink>
  </div>
</template>
