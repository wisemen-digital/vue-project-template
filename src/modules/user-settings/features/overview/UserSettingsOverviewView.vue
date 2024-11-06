<script setup lang="ts">
import FormLayout from '@/components/form/FormLayout.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import UserSettingsOverviewInterfaceThemeSection
  from '@/modules/user-settings/features/components/interface-theme/UserSettingsOverviewInterfaceThemeSection.vue'

const { t } = useI18n()
</script>

<template>
  <AppPage :title="t('module.settings.title')">
    <FormLayout>
      <UserSettingsOverviewInterfaceThemeSection />
    </FormLayout>
  </AppPage>
</template>
