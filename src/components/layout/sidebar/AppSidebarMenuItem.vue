<script setup lang="ts">
import {
  AppIcon,
  AppKeyboardShortcut,
  AppKeyboardShortcutProvider,
  AppText,
  AppTooltip,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'
import { NavigationItem } from '@/types/navigationItem.type'

const props = defineProps<{
  item: NavigationItem
}>()

const { t } = useI18n()
</script>

<template>
  <li :key="props.item.label">
    <AppTooltip
      :disable-close-on-trigger-click="true"
      :hide-arrow="true"
      side="right"
    >
      <Component
        :is="props.item.keyboardShortcut === undefined ? 'div' : AppKeyboardShortcutProvider"
        :config="props.item.keyboardShortcut"
      >
        <AppTypedRouterLink
          v-slot="{ isActive }"
          :to="props.item.to"
          class="block rounded-button"
        >
          <div
            :class="[
              isActive ? 'bg-primary/5 text-primary' : 'text-muted-foreground',
            ]"
            class="flex size-10 items-center justify-center rounded-button"
          >
            <AppIcon
              :icon="props.item.icon"
              size="lg"
            />
          </div>
        </AppTypedRouterLink>
      </Component>

      <template #content>
        <div class="flex items-center gap-x-2 px-2 py-1.5">
          <AppText
            variant="caption"
            class="text-muted-foreground"
          >
            {{ t('components.sidebar.go_to') }} <span class="lowercase">{{ props.item.label }}</span>
          </AppText>

          <AppKeyboardShortcut
            v-if="props.item.keyboardShortcut !== undefined"
            :keys="props.item.keyboardShortcut.keys"
            variant="bordered"
          />
        </div>
      </template>
    </AppTooltip>
  </li>
</template>
