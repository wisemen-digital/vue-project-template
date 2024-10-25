<script setup lang="ts">
import type { NavigationItem } from '@wisemen/vue-core'
import { AppSidebarNavigation } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppSidebarMenuItem from '@/components/layout/sidebar/AppSidebarMenuItem.vue'
import AppSidebarMenuTooltipContent from '@/components/layout/sidebar/AppSidebarMenuTooltipContent.vue'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcuts.constant'

import AppSidebarFooter from './AppSidebarFooter.vue'
import AppSidebarHeader from './AppSidebarHeader.vue'

const { t } = useI18n()

const navigationItems = computed<NavigationItem[]>(() => [
  {
    icon: 'users',
    keyboardShortcut: KEYBOARD_SHORTCUT.USER_OVERVIEW,
    label: t('shared.users'),
    to: {
      name: 'user-overview',
    },
    type: 'option',
  },
  {
    icon: 'creditCard',
    label: 'Payments',
    to: {
      name: 'auth-login',
    },
    type: 'option',
  },
  {
    icon: 'settings',
    label: 'Settings',
    to: {
      name: 'auth-login',
    },
    type: 'option',
  },
])
</script>

<template>
  <AppSidebarNavigation :items="navigationItems">
    <template #header>
      <AppSidebarHeader />
    </template>

    <template #trigger="{ navigationItem, isOpen }">
      <AppSidebarMenuItem
        :is-open="isOpen"
        :navigation-item="navigationItem"
      />
    </template>
    <template #content="{ navigationItem, isOpen }">
      <AppSidebarMenuTooltipContent
        :navigation-item="navigationItem"
        :is-open="isOpen"
      />
    </template>
    <template #footer>
      <AppSidebarFooter />
    </template>
  </AppSidebarNavigation>
</template>
