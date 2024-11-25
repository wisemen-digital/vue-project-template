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

import FormSection from '@/components/form/FormSection.vue'
import { useTheme } from '@/composables/theme/theme.composable'
import SettingOverviewMiniDashboard from '@/modules/setting/features/components/interface-theme/SettingOverviewMiniDashboard.vue'
import { BrowserUtil } from '@/utils/browser.util'

type ThemeValue = 'dark' | 'light' | 'system'

const { t } = useI18n()
const darkMode = useDarkMode()
const theme = useTheme()

const themes = computed<RadioGroupItem<ThemeValue>[]>(() => [
  {
    label: t('module.setting.interface_theme.light'),
    value: 'light',
  },
  {
    label: t('module.setting.interface_theme.dark'),
    value: 'dark',
  },
  {
    label: t('module.setting.interface_theme.system_preference'),
    value: 'system',
  },
])

const value = computed<'dark' | 'light' | 'system'>({
  get: () => darkMode.value.value,
  set: (value) => {
    if (!BrowserUtil.hasSupportForViewTransition()) {
      darkMode.value.value = value

      return
    }

    document.startViewTransition(() => {
      darkMode.value.value = value
    })
  },
})

function getIsDarkModeEnabled(value: 'dark' | 'light' | 'system'): boolean {
  if (value === 'dark') {
    return true
  }

  if (value === 'light') {
    return false
  }

  return darkMode.isSystemDarkMode.value
}
</script>

<template>
  <FormSection
    :title="t('module.setting.interface_theme.title')"
    :description="t('module.setting.interface_theme.description')"
  >
    <VcRadioGroup
      v-model="value"
      :items="themes"
    >
      <template #items="{ items }">
        <div class="grid gap-lg lg:grid-cols-3">
          <VcRadioGroupItem
            v-for="item of items"
            :key="item.value"
            :item="item"
            class="group rounded-xl text-left !ring-0 !ring-offset-0"
          >
            <VcThemeProvider
              :is-dark-mode-enabled="getIsDarkModeEnabled(item.value)"
              :theme="theme"
            >
              <div class="relative h-40 overflow-hidden rounded-xl border-2 border-solid border-transparent bg-tertiary ring-brand-primary-500 ring-offset-1 duration-200 group-focus-visible:ring-2 group-data-[state=checked]:border-brand">
                <SettingOverviewMiniDashboard class="absolute left-4 top-4" />
              </div>
            </VcThemeProvider>

            <span class="mt-md block text-sm text-primary">
              {{ item.label }}
            </span>
          </VcRadioGroupItem>
        </div>
      </template>
    </VcRadioGroup>
  </FormSection>
</template>
