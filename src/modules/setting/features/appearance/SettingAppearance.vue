<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppGrid from '@/components/app/AppGrid.vue'
import AppSeparator from '@/components/app/AppSeparator.vue'
import type { SettingNavigation } from '@/modules/setting/composables/settingNavigation.composable.ts'
import SettingAppearanceFontSizeSection
  from '@/modules/setting/features/components/appearance/SettingAppearanceFontSizeSection.vue'
import SettingAppearanceHighContrastSection
  from '@/modules/setting/features/components/appearance/SettingAppearanceHighContrastSection.vue'
import SettingAppearanceInterfaceThemeSection
  from '@/modules/setting/features/components/appearance/SettingAppearanceInterfaceThemeSection.vue'
import SettingAppearanceKeyboardShortcutSection
  from '@/modules/setting/features/components/appearance/SettingAppearanceKeyboardShortcutSection.vue'
import SettingAppearanceLanguageSection
  from '@/modules/setting/features/components/appearance/SettingAppearanceLanguageSection.vue'
import SettingAppearanceReduceMotionSection
  from '@/modules/setting/features/components/appearance/SettingAppearanceReduceMotionSection.vue'
import SettingContainer from '@/modules/setting/features/components/SettingContainer.vue'

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
    <div class="flex w-full flex-col p-3xl gap-xl">
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
