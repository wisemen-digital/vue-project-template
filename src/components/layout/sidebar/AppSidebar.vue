<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { MenuItem } from '@/types/menuItem.type'

import AppSidebarFooter from './AppSidebarFooter.vue'
import AppSidebarHeader from './AppSidebarHeader.vue'
import AppSidebarMenu from './AppSidebarMenu.vue'

const { t } = useI18n()

const menuItems: MenuItem[] = [
  {
    icon: 'building',
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
]
</script>

<template>
  <div class="sticky left-0 top-0 flex h-screen w-20 flex-col items-center justify-between border-r border-solid border-border py-6">
    <div>
      <AppSidebarHeader />
      <AppSidebarMenu :items="menuItems" />
    </div>

    <AppSidebarFooter />
  </div>
</template>
