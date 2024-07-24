<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcuts.constant'
import type { NavigationItem } from '@/types/navigationItem.type'

import AppSidebarFooter from './AppSidebarFooter.vue'
import AppSidebarHeader from './AppSidebarHeader.vue'
import AppSidebarMenu from './AppSidebarMenu.vue'

const { t } = useI18n()

const navigationItems = computed<NavigationItem[]>(() => [
  {
    icon: 'users',
    keyboardShortcut: KEYBOARD_SHORTCUT.USER_OVERVIEW,
    label: t('shared.users'),
    to: {
      name: 'user-overview',
    },
  },
  {
    icon: 'creditCard',
    label: 'Payments',
    to: {
      name: 'login',
    },
  },
  {
    icon: 'settings',
    label: 'Settings',
    to: {
      name: 'login',
    },
  },
])
</script>

<template>
  <div class="sticky left-0 top-0 h-dvh p-4">
    <div class="flex h-full w-20 flex-col items-center justify-between rounded-xl border border-solid border-border bg-muted-background py-6">
      <div>
        <AppSidebarHeader />
        <AppSidebarMenu :items="navigationItems" />
      </div>

      <AppSidebarFooter />
    </div>
  </div>
</template>
