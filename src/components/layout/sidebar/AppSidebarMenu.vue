<script setup lang="ts">
import {
  AppIcon,
  AppKeyboardCommand,
  AppText,
  AppTooltip,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'
import { NavigationItem } from '@/types/navigationItem.type'

const props = defineProps<{
  items: NavigationItem[]
}>()

const { t } = useI18n()
</script>

<template>
  <nav class="mt-16">
    <ul class="flex flex-col items-center gap-y-2">
      <li
        v-for="item of props.items"
        :key="item.label"
      >
        <AppTooltip
          :disable-close-on-trigger-click="true"
          :hide-arrow="true"
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

          <template #content>
            <div class="flex items-center gap-x-2 px-2 py-1.5">
              <AppText
                variant="caption"
                class="text-muted-foreground"
              >
                {{ t('components.sidebar.go_to') }} <span class="lowercase">{{ item.label }}</span>
              </AppText>

              <AppKeyboardCommand
                v-if="item.command"
                :keys="item.command.keys"
                :has-border="true"
                :command-type="item.command.type"
              />
            </div>
          </template>
        </AppTooltip>
      </li>
    </ul>
  </nav>
</template>
