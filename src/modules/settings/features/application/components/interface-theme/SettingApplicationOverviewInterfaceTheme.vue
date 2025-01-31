<script setup lang="ts">
import {
  type RadioGroupItem,
  useDarkMode,
  VcRadioGroup,
  VcRadioGroupItem,
  VcThemeProvider,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Theme } from '@/client'
import FormFieldset from '@/components/form/FormFieldset.vue'
import { usePreferences } from '@/composables/preference/preferences.composable.ts'
import { useTheme } from '@/composables/theme/theme.composable'
import SettingApplicationOverviewMiniDashboard from '@/modules/settings/features/application/components/interface-theme/SettingApplicationOverviewMiniDashboard.vue'

const { t } = useI18n()
const darkMode = useDarkMode()
const theme = useTheme()
const preferences = usePreferences()

const themes = computed<RadioGroupItem<Theme>[]>(() => [
  {
    label: t('module.setting.interface_theme.light'),
    value: Theme.LIGHT,
  },
  {
    label: t('module.setting.interface_theme.dark'),
    value: Theme.DARK,
  },
  {
    label: t('module.setting.interface_theme.system_preference'),
    value: Theme.SYSTEM,
  },
])

const value = computed<Theme>({
  get: () => darkMode.value.value as Theme,
  set: (value: Theme) => {
    darkMode.value.value = value
  },
})

function getIsDarkModeEnabled(value: Theme): boolean {
  if (value === 'dark') {
    return true
  }

  if (value === 'light') {
    return false
  }

  return darkMode.isSystemDarkMode.value
}

function onUpdateModelValue(newValue: Theme | null): void {
  if (newValue === null) {
    return
  }

  preferences.update({
    theme: newValue,
  })
}
</script>

<template>
  <FormFieldset
    :title="t('module.setting.interface_theme.title')"
    :description="t('module.setting.interface_theme.description')"
  >
    <VcRadioGroup
      v-model="value"
      @update:model-value="onUpdateModelValue"
    >
      <div class="grid gap-lg lg:grid-cols-3">
        <VcRadioGroupItem
          v-for="item of themes"
          :key="item.value"
          :value="item.value"
          :item="item"
          class="group rounded-xl text-left !ring-0 !ring-offset-0"
        >
          <VcThemeProvider
            :is-dark-mode-enabled="getIsDarkModeEnabled(item.value)"
            :theme="theme"
          >
            <div class="relative h-40 overflow-hidden rounded-xl border-2 border-solid border-transparent bg-tertiary ring-brand-primary-500 ring-offset-1 duration-200 group-focus-visible:ring-2 group-data-[state=checked]:border-brand">
              <SettingApplicationOverviewMiniDashboard class="absolute left-4 top-4" />
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
