<script setup lang="ts">
import {
  useAppearance,
  VcRadioGroup,
  VcRadioGroupItemRoot,
  VcThemeProvider,
} from '@wisemen/vue-core-components'
import {
  computed,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { UiTheme } from '@/client'
import FormFieldset from '@/components/form/FormFieldset.vue'
import { useTheme } from '@/composables/theme/theme.composable.ts'
import { useSettingsPreferences } from '@/modules/settings/composables/settingsPreferences.composable.ts'
import SettingsAppearanceMiniDashboard from '@/modules/settings/features/appearance/components/SettingsAppearanceMiniDashboard.vue'

const i18n = useI18n()
const darkMode = useAppearance()
const preferences = useSettingsPreferences()
const theme = useTheme()

const appearances = computed<{
  label: string
  value: UiTheme
}[]>(() => [
  {
    label: i18n.t('module.settings.interface_theme.light'),
    value: UiTheme.LIGHT,
  },
  {
    label: i18n.t('module.settings.interface_theme.dark'),
    value: UiTheme.DARK,
  },
  {
    label: i18n.t('module.settings.interface_theme.system_preference'),
    value: UiTheme.SYSTEM,
  },
])

watch(darkMode, () => {
  preferences.update({ theme: darkMode.value as UiTheme })
})
</script>

<template>
  <FormFieldset :title="i18n.t('module.settings.interface_theme.title')">
    <VcRadioGroup v-model="darkMode">
      <div
        class="
          gap-lg grid max-w-160
          lg:grid-cols-3
        "
      >
        <VcRadioGroupItemRoot
          v-for="item of appearances"
          :key="item.value"
          :value="item.value"
          class="rounded-xl text-left"
        >
          <VcThemeProvider
            :appearance="item.value"
            :theme="theme"
            class="w-full"
          >
            <div
              v-if="item.value === UiTheme.SYSTEM"
              class="
                ring-brand-500 relative h-30 w-full overflow-hidden rounded-xl
                border-2 border-solid border-transparent ring-offset-1
                duration-200
                group-data-[state=checked]/radio-group-item:border-brand
                group-focus-visible/radio-group-item:ring-2
              "
            >
              <VcThemeProvider
                :appearance="UiTheme.LIGHT"
                :theme="theme"
              >
                <div class="bg-tertiary absolute inset-0">
                  <SettingsAppearanceMiniDashboard
                    class="absolute top-1/6 left-1/10"
                  />
                </div>
              </VcThemeProvider>
              <VcThemeProvider
                :appearance="UiTheme.DARK"
                :theme="theme"
              >
                <div
                  class="bg-tertiary absolute inset-0 left-1/2 overflow-hidden"
                >
                  <SettingsAppearanceMiniDashboard
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
                group-data-[state=checked]/radio-group-item:border-brand
              "
            >
              <SettingsAppearanceMiniDashboard
                class="absolute top-1/6 left-1/10"
              />
            </div>
          </VcThemeProvider>

          <span class="mt-md text-primary block text-sm">
            {{ item.label }}
          </span>
        </VcRadioGroupItemRoot>
      </div>
    </VcRadioGroup>
  </FormFieldset>
</template>
