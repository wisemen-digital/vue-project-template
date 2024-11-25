<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import AppPage from '@/components/layout/AppPage.vue'
import SettingOverviewFontSizeSection from '@/modules/setting/features/components/font-size/SettingOverviewFontSizeSection.vue'
import SettingOverviewInterfaceThemeSection from '@/modules/setting/features/components/interface-theme/SettingOverviewInterfaceThemeSection.vue'
import SettingOverviewKeyboardShortcutSection from '@/modules/setting/features/components/keyboard-shortcuts/SettingOverviewKeyboardShortcutSection.vue'
import SettingOverviewLanguageSection from '@/modules/setting/features/components/language/SettingOverviewLanguageSection.vue'
import SettingOverviewReduceMotionSection from '@/modules/setting/features/components/reduce-motion/SettingOverviewReduceMotionSection.vue'

const { t } = useI18n()
</script>

<template>
  <AppPage :title="t('module.setting.title')">
    <FormLayout>
      <SettingOverviewInterfaceThemeSection />
      <AppSeparator />
      <SettingOverviewLanguageSection />
      <AppSeparator />
      <SettingOverviewFontSizeSection />
      <AppSeparator />
      <SettingOverviewKeyboardShortcutSection />
      <AppSeparator />
      <SettingOverviewReduceMotionSection />
    </FormLayout>
  </AppPage>
</template>
