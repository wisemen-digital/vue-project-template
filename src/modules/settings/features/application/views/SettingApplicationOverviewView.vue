<script setup lang="ts">
import AppSeparator from '@/components/app/AppSeparator.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import SettingApplicationOverviewFontSize from '@/modules/settings/features/application/components/font-size/SettingApplicationOverviewFontSize.vue'
import SettingApplicationOverviewHighContrast from '@/modules/settings/features/application/components/high-contrast/SettingApplicationOverviewHighContrast.vue'
import SettingApplicationOverviewInterfaceTheme from '@/modules/settings/features/application/components/interface-theme/SettingApplicationOverviewInterfaceTheme.vue'
import SettingApplicationOverviewKeyboardShortcut from '@/modules/settings/features/application/components/keyboard-shortcuts/SettingApplicationOverviewKeyboardShortcut.vue'
import SettingApplicationOverviewLanguage from '@/modules/settings/features/application/components/language/SettingApplicationOverviewLanguage.vue'
import SettingApplicationOverviewReduceMotion from '@/modules/settings/features/application/components/reduce-motion/SettingApplicationOverviewReduceMotion.vue'
</script>

<template>
  <FormLayout>
    <SettingApplicationOverviewInterfaceTheme />
    <AppSeparator />
    <SettingApplicationOverviewLanguage />
    <AppSeparator />
    <SettingApplicationOverviewFontSize />
    <AppSeparator />
    <SettingApplicationOverviewKeyboardShortcut />
    <AppSeparator />
    <SettingApplicationOverviewReduceMotion />
    <AppSeparator />
    <SettingApplicationOverviewHighContrast />
  </FormLayout>
</template>
