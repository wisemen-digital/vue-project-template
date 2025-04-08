<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import AppGrid from '@/components/app/grid/AppGrid.vue'
import SettingsDialogContainer from '@/modules/settings/components/SettingsDialogContainer.vue'
import type { SettingsNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'
import SettingsAppearanceFontSizeSection from '@/modules/settings/features/appearance/components/SettingsAppearanceFontSizeSection.vue'
import SettingsAppearanceHighContrastSection from '@/modules/settings/features/appearance/components/SettingsAppearanceHighContrastSection.vue'
import SettingsAppearanceInterfaceThemeSection from '@/modules/settings/features/appearance/components/SettingsAppearanceInterfaceThemeSection.vue'
import SettingsAppearanceKeyboardShortcutSection from '@/modules/settings/features/appearance/components/SettingsAppearanceKeyboardShortcutSection.vue'
import SettingsAppearanceLanguageSection from '@/modules/settings/features/appearance/components/SettingsAppearanceLanguageSection.vue'
import SettingsAppearanceReduceMotionSection from '@/modules/settings/features/appearance/components/SettingsAppearanceReduceMotionSection.vue'

const props = defineProps<{
  navigation: SettingsNavigation
}>()

const i18n = useI18n()
</script>

<template>
  <SettingsDialogContainer
    :title="i18n.t('module.settings.appearance')"
    :navigation="props.navigation"
  >
    <div class="p-3xl gap-xl flex w-full flex-col">
      <SettingsAppearanceInterfaceThemeSection />
      <AppGrid
        :cols="2"
        class="w-fit"
      >
        <SettingsAppearanceLanguageSection />
        <SettingsAppearanceFontSizeSection />
      </AppGrid>
      <AppSeparator direction="horizontal" />
      <SettingsAppearanceKeyboardShortcutSection />
      <AppSeparator direction="horizontal" />
      <SettingsAppearanceReduceMotionSection />
      <AppSeparator direction="horizontal" />
      <SettingsAppearanceHighContrastSection />
    </div>
  </SettingsDialogContainer>
</template>
