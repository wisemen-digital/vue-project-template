<script  lang="ts" setup="">
import type { Icon, Routes } from '@wisemen/vue-core'
import { computed } from 'vue'

import AppGrid from '@/components/app/AppGrid.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import SettingsOverviewItemCard from '@/modules/settings/features/overview/components/SettingsOverviewItemCard.vue'

const i18n = useI18n()

interface settingsItem {
  title: string
  description: string
  icon: Icon
  to: Routes[number]
}
const mySettingsItems = computed<settingsItem[]>(() => ([
  {
    title: i18n.t('module.settings.users.title'),
    description: i18n.t('module.settings.users.description'),
    icon: 'barChartSquare',
    to: {
      name: 'settings-users',
    },
  },
  {
    title: i18n.t('module.settings.theme.title'),
    description: i18n.t('module.settings.theme.description'),
    icon: 'edit',
    to: {
      name: 'settings-theme',
    },
  },
]))
</script>

<template>
  <AppPage
    :subtitle="i18n.t('module.settings.description')"
    :title="i18n.t('module.settings.title')"
  >
    <AppGrid :cols="1">
      <h1
        class="font-semibold text-tertiary"
      >
        {{ i18n.t('module.settings.my_settings.title') }}
      </h1>
      <div class="grid grid-cols-3 gap-6">
        <SettingsOverviewItemCard
          v-for="item in mySettingsItems"
          :key="item.title"
          :icon="item.icon"
          :title="item.title"
          :description="item.description"
          :to="item.to"
        />
      </div>
    </AppGrid>
  </apppage>
</template>
