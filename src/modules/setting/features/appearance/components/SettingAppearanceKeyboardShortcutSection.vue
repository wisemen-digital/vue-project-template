<script setup lang="ts">
import {
  VcButton,
  VcKeyboardShortcut,
  VcSwitch,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/AppGroup.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable.ts'
import { useSettingPreferences } from '@/modules/setting/composables/settingPreferences.composable.ts'

const i18n = useI18n()
const value = useKeyboardShortcutVisibilityValue()
const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()
const preferences = useSettingPreferences()

const computedValue = computed<boolean>({
  get: () => value.value,
  set: (newValue) => {
    value.value = newValue
  },
})

const label = computed<string>(() => {
  if (value.value) {
    return i18n.t('module.setting.keyboard_shortcuts.enabled.label')
  }

  return i18n.t('module.setting.keyboard_shortcuts.disabled.label')
})

const description = computed<string>(() => {
  if (value.value) {
    return i18n.t('module.setting.keyboard_shortcuts.enabled.description')
  }

  return i18n.t('module.setting.keyboard_shortcuts.disabled.description')
})

function onUpdateModelValue(newValue: boolean): void {
  preferences.update({
    showShortcuts: newValue,
  })
}
</script>

<template>
  <FormFieldset :title="i18n.t('module.setting.keyboard_shortcuts.title')">
    <AppGroup
      gap="6xl"
      align="start"
    >
      <VcSwitch
        v-model="computedValue"
        :label="label"
        :hint="description"
        @update:model-value="onUpdateModelValue"
      />

      <VcButton
        variant="secondary"
        size="sm"
      >
        <AppGroup>
          <span>
            {{ i18n.t('module.setting.keyboard_shortcuts.example_button') }}
          </span>

          <VcKeyboardShortcut
            v-if="computedValue && isKeyboardShortcutHintVisible"
            :keyboard-keys="['meta', 'k']"
            keyboard-classes="border-0 bg-tertiary"
          />
        </AppGroup>
      </VcButton>
    </AppGroup>
  </FormFieldset>
</template>
