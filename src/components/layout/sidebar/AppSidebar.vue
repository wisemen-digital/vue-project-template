<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcuts.constant'
import { NavigationItem } from '@/types/navigationItem.type'

import AppSidebarFooter from './AppSidebarFooter.vue'
import AppSidebarHeader from './AppSidebarHeader.vue'
import AppSidebarMenu from './AppSidebarMenu.vue'

const { t } = useI18n()

const navigationItems = computed<NavigationItem[]>(() => [
  {
    icon: 'building',
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
  <div class="sticky left-0 top-0 flex h-dvh w-20 flex-col items-center justify-between border-r border-solid border-border py-6">
    <div>
      <AppSidebarHeader />
      <AppSidebarMenu :items="navigationItems" />
    </div>

    <AppSidebarFooter />
  </div>
</template>
