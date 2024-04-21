<script setup lang="ts">
import { useKeyboardCommand } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import { NavigationItem } from '@/types/navigationItem.type'

import AppSidebarFooter from './AppSidebarFooter.vue'
import AppSidebarHeader from './AppSidebarHeader.vue'
import AppSidebarMenu from './AppSidebarMenu.vue'

const { t } = useI18n()
const router = useTypedRouter()

const navigationItems = computed<NavigationItem[]>(() => [
  {
    command: {
      keys: [
        'g',
        'u',
      ],
      type: 'sequence',
    },
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
])

navigationItems.value.forEach((item) => {
  if (item.command === undefined) {
    return
  }

  useKeyboardCommand({
    command: {
      ...item.command,
      onPressed: () => {
        void router.push(item.to)
      },
    },
    scope: 'global',
  })
})
</script>

<template>
  <div class="sticky left-0 top-0 flex h-screen w-20 flex-col items-center justify-between border-r border-solid border-border py-6">
    <div>
      <AppSidebarHeader />
      <AppSidebarMenu :items="navigationItems" />
    </div>

    <AppSidebarFooter />
  </div>
</template>
