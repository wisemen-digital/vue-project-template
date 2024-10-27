<script setup lang="ts">
import FormLayout from '@/components/form/FormLayout.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import SettingsOverviewInterfaceThemeSection from '@/modules/settings/features/components/interface-theme/SettingsOverviewInterfaceThemeSection.vue'

const { t } = useI18n()
</script>

<template>
  <AppPage :title="t('module.settings.title')">
    <FormLayout>
      <SettingsOverviewInterfaceThemeSection />
    </FormLayout>
  </AppPage>
</template>
