<script setup lang="ts">
import {
  type RadioGroupItem,
  useDarkMode,
  VcRadioGroup,
  VcRadioGroupItem,
  VcThemeProvider,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import FormSection from '@/components/form/FormSection.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import SettingsOverviewMiniDashboard from '@/modules/settings/features/components/interface-theme/SettingsOverviewMiniDashboard.vue'

type ThemeValue = 'dark' | 'light' | 'system'

const { t } = useI18n()
const darkMode = useDarkMode()

const themes = computed<RadioGroupItem<ThemeValue>[]>(() => [
  {
    label: t('module.settings.interface_theme.light'),
    value: 'light',
  },
  {
    label: t('module.settings.interface_theme.dark'),
    value: 'dark',
  },
  {
    label: t('module.settings.interface_theme.system_preference'),
    value: 'system',
  },
])

function getTheme(value: ThemeValue): 'dark' | 'light' {
  if (value === 'system') {
    return darkMode.isSystemDarkMode.value ? 'dark' : 'light'
  }

  if (value === 'dark') {
    return 'dark'
  }

  return 'light'
}
</script>

<template>
  <FormSection
    :title="t('module.settings.interface_theme.title')"
    :description="t('module.settings.interface_theme.description')"
  >
    <VcRadioGroup
      v-model="darkMode.value.value"
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
            <VcThemeProvider :theme="getTheme(item.value)">
              <div class="relative h-40 overflow-hidden rounded-xl border-2 border-solid border-transparent bg-tertiary ring-brand-primary-500 ring-offset-1 duration-200 group-focus-visible:ring-2 group-data-[state=checked]:border-brand">
                <SettingsOverviewMiniDashboard class="absolute left-4 top-4" />
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
