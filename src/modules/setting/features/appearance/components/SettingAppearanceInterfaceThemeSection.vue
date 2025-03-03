<script setup lang="ts">
import {
  type RadioGroupItem,
  useDarkMode,
  VcRadioGroup,
  VcRadioGroupItem,
  VcThemeProvider,
} from '@wisemen/vue-core'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { Theme } from '@/client'
import FormFieldset from '@/components/form/FormFieldset.vue'
import { usePreferences } from '@/composables/preference/preferences.composable.ts'
import { useTheme } from '@/composables/theme/theme.composable.ts'
import SettingAppearanceMiniDashboard from '@/modules/setting/features/appearance/components/SettingAppearanceMiniDashboard.vue'

const i18n = useI18n()
const darkMode = useDarkMode()
const preferences = usePreferences()
const theme = useTheme()

const appearances = computed<RadioGroupItem<Theme>[]>(() => [
  {
    label: i18n.t('module.setting.interface_theme.light'),
    value: Theme.LIGHT,
  },
  {
    label: i18n.t('module.setting.interface_theme.dark'),
    value: Theme.DARK,
  },
  {
    label: i18n.t('module.setting.interface_theme.system_preference'),
    value: Theme.SYSTEM,
  },
])

watch(darkMode, () => {
  preferences.update({
    theme: darkMode.value as Theme,
  })
})
</script>

<template>
  <FormFieldset :title="i18n.t('module.setting.interface_theme.title')">
    <VcRadioGroup v-model="darkMode">
      <div class="grid gap-lg max-w-160 lg:grid-cols-3">
        <VcRadioGroupItem
          v-for="item of appearances"
          :key="item.value"
          :value="item.value"
          class="group rounded-xl text-left cursor-pointer !ring-0 !ring-offset-0"
        >
          <VcThemeProvider
            :appearance="item.value"
            :theme="theme"
          >
            <div
              v-if="item.value === Theme.SYSTEM"
              class="relative h-30 rounded-xl overflow-hidden border-2 border-solid ring-brand-500 border-solid border-transparent ring-offset-1 duration-200 group-focus-visible:ring-2 group-data-[state=checked]:border-brand"
            >
              <VcThemeProvider
                :appearance="Theme.LIGHT"
                :theme="theme"
              >
                <div class="absolute inset-0 bg-tertiary">
                  <SettingAppearanceMiniDashboard class="absolute left-1/10 top-1/6" />
                </div>
              </VcThemeProvider>
              <VcThemeProvider
                :appearance="Theme.DARK"
                :theme="theme"
              >
                <div class="absolute inset-0 left-1/2 overflow-hidden bg-tertiary">
                  <SettingAppearanceMiniDashboard class="absolute -left-7/8 top-1/6" />
                </div>
              </VcThemeProvider>
            </div>
            <div
              v-else
              class="relative h-30 overflow-hidden rounded-xl border-2 border-solid border-transparent bg-tertiary ring-brand-500 ring-offset-1 duration-200 group-focus-visible:ring-2 group-data-[state=checked]:border-brand"
            >
              <SettingAppearanceMiniDashboard class="absolute left-1/10 top-1/6" />
            </div>
          </VcThemeProvider>

          <span class="mt-md block text-sm text-primary">
            {{ item.label }}
          </span>
        </VcRadioGroupItem>
      </div>
    </VcRadioGroup>
  </FormFieldset>
</template>
