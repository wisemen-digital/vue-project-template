<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import AppGrid from '@/components/app/grid/AppGrid.vue'
import SettingContainer from '@/modules/setting/components/SettingContainer.vue'
import type { SettingNavigation } from '@/modules/setting/composables/settingNavigation.composable.ts'
import SettingAppearanceFontSizeSection from '@/modules/setting/features/appearance/components/SettingAppearanceFontSizeSection.vue'
import SettingAppearanceHighContrastSection from '@/modules/setting/features/appearance/components/SettingAppearanceHighContrastSection.vue'
import SettingAppearanceInterfaceThemeSection from '@/modules/setting/features/appearance/components/SettingAppearanceInterfaceThemeSection.vue'
import SettingAppearanceKeyboardShortcutSection from '@/modules/setting/features/appearance/components/SettingAppearanceKeyboardShortcutSection.vue'
import SettingAppearanceLanguageSection from '@/modules/setting/features/appearance/components/SettingAppearanceLanguageSection.vue'
import SettingAppearanceReduceMotionSection from '@/modules/setting/features/appearance/components/SettingAppearanceReduceMotionSection.vue'

const props = defineProps<{
  navigation: SettingNavigation
}>()

const i18n = useI18n()
</script>

<template>
  <SettingContainer
    :title="i18n.t('module.setting.appearance')"
    :navigation="props.navigation"
  >
    <div class="p-3xl gap-xl flex w-full flex-col">
      <SettingAppearanceInterfaceThemeSection />
      <AppGrid
        :cols="2"
        class="w-fit"
      >
        <SettingAppearanceLanguageSection />
        <SettingAppearanceFontSizeSection />
      </AppGrid>
      <AppSeparator direction="horizontal" />
      <SettingAppearanceKeyboardShortcutSection />
      <AppSeparator direction="horizontal" />
      <SettingAppearanceReduceMotionSection />
      <AppSeparator direction="horizontal" />
      <SettingAppearanceHighContrastSection />
    </div>
  </SettingContainer>
</template>
