<script setup lang="ts">
import type { RadioGroupItem } from '@wisemen/vue-core'
import {
  useDarkMode,
  VcRadioGroup,
  VcRadioGroupItem,
  VcThemeProvider,
} from '@wisemen/vue-core'
import {
  computed,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { Theme } from '@/client'
import FormFieldset from '@/components/form/FormFieldset.vue'
import { useTheme } from '@/composables/theme/theme.composable.ts'
import { useSettingPreferences } from '@/modules/setting/composables/settingPreferences.composable.ts'
import SettingAppearanceMiniDashboard from '@/modules/setting/features/appearance/components/SettingAppearanceMiniDashboard.vue'

const i18n = useI18n()
const darkMode = useDarkMode()
const preferences = useSettingPreferences()
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
  preferences.update({ theme: darkMode.value as Theme })
})
</script>

<template>
  <FormFieldset :title="i18n.t('module.setting.interface_theme.title')">
    <VcRadioGroup v-model="darkMode">
      <div
        class="
          gap-lg grid max-w-160
          lg:grid-cols-3
        "
      >
        <VcRadioGroupItem
          v-for="item of appearances"
          :key="item.value"
          :value="item.value"
          class="
            group cursor-pointer rounded-xl text-left !ring-0 !ring-offset-0
          "
        >
          <VcThemeProvider
            :appearance="item.value"
            :theme="theme"
          >
            <div
              v-if="item.value === Theme.SYSTEM"
              class="
                ring-brand-500 relative h-30 overflow-hidden rounded-xl border-2
                border-solid border-transparent ring-offset-1 duration-200
                group-data-[state=checked]:border-brand
                group-focus-visible:ring-2
              "
            >
              <VcThemeProvider
                :appearance="Theme.LIGHT"
                :theme="theme"
              >
                <div class="bg-tertiary absolute inset-0">
                  <SettingAppearanceMiniDashboard
                    class="absolute top-1/6 left-1/10"
                  />
                </div>
              </VcThemeProvider>
              <VcThemeProvider
                :appearance="Theme.DARK"
                :theme="theme"
              >
                <div
                  class="bg-tertiary absolute inset-0 left-1/2 overflow-hidden"
                >
                  <SettingAppearanceMiniDashboard
                    class="absolute top-1/6 -left-7/8"
                  />
                </div>
              </VcThemeProvider>
            </div>
            <div
              v-else
              class="
                bg-tertiary ring-brand-500 relative h-30 overflow-hidden
                rounded-xl border-2 border-solid border-transparent
                ring-offset-1 duration-200
                group-data-[state=checked]:border-brand
                group-focus-visible:ring-2
              "
            >
              <SettingAppearanceMiniDashboard class="absolute top-1/6 left-1/10" />
            </div>
          </VcThemeProvider>

          <span class="mt-md text-primary block text-sm">
            {{ item.label }}
          </span>
        </VcRadioGroupItem>
      </div>
    </VcRadioGroup>
  </FormFieldset>
</template>
