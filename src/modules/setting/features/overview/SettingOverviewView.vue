<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import AppPage from '@/components/layout/AppPage.vue'
import SettingOverviewFontSize from '@/modules/setting/features/components/font-size/SettingOverviewFontSize.vue'
import SettingOverviewHighContrast from '@/modules/setting/features/components/high-contrast/SettingOverviewHighContrast.vue'
import SettingOverviewInterfaceTheme from '@/modules/setting/features/components/interface-theme/SettingOverviewInterfaceTheme.vue'
import SettingOverviewKeyboardShortcut from '@/modules/setting/features/components/keyboard-shortcuts/SettingOverviewKeyboardShortcut.vue'
import SettingOverviewLanguage from '@/modules/setting/features/components/language/SettingOverviewLanguage.vue'
import SettingOverviewReduceMotion from '@/modules/setting/features/components/reduce-motion/SettingOverviewReduceMotion.vue'

const { t } = useI18n()
</script>

<template>
  <AppPage :title="t('module.setting.title')">
    <FormLayout>
      <SettingOverviewInterfaceTheme />
      <AppSeparator />
      <SettingOverviewLanguage />
      <AppSeparator />
      <SettingOverviewFontSize />
      <AppSeparator />
      <SettingOverviewKeyboardShortcut />
      <AppSeparator />
      <SettingOverviewReduceMotion />
      <AppSeparator />
      <SettingOverviewHighContrast />
    </FormLayout>
  </AppPage>
</template>
