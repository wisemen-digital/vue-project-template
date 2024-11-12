<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { computed } from 'vue'

import FormLayout from '@/components/form/FormLayout.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import UserSettingsOverviewInterfaceThemeSection
  from '@/modules/settings/features/theme/components/interface-theme/UserSettingsOverviewInterfaceThemeSection.vue'

const { t } = useI18n()

const breadCrumbs = computed<BreadcrumbItem[]>(() => ([
  {
    icon: 'settings',
    label: t('module.settings.title'),
    to: {
      name: 'settings-overview',
    },
    type: 'route',
  },
  {
    label: t('module.settings.theme.title'),
    type: 'page',
  },
]))
</script>

<template>
  <AppPage
    :title="t('module.settings.title')"
    :breadcrumbs="breadCrumbs"
  >
    <FormLayout>
      <UserSettingsOverviewInterfaceThemeSection />
    </FormLayout>
  </AppPage>
</template>
