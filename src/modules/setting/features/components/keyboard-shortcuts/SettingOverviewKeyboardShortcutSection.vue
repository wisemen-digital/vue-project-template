<script setup lang="ts">
import {
  VcButton,
  VcKeyboardShortcut,
  VcSwitch,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/AppGroup.vue'
import FormSection from '@/components/form/FormSection.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'
import { useReduceMotionValue } from '@/composables/reduce-motion/reduceMotion.composable'
import { BrowserUtil } from '@/utils/browser.util'

const { t } = useI18n()
const value = useKeyboardShortcutVisibilityValue()
const isReduceMotionEnabled = useReduceMotionValue()
const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()

const computedValue = computed<boolean>({
  get: () => value.value,
  set: (newValue) => {
    if (!BrowserUtil.hasSupportForViewTransition() || isReduceMotionEnabled.value) {
      value.value = newValue

      return
    }

    document.startViewTransition(() => {
      value.value = newValue
    })
  },
})

const label = computed<string>(() => {
  if (value.value) {
    return t('module.setting.keyboard_shortcuts.enabled.label')
  }

  return t('module.setting.keyboard_shortcuts.disabled.label')
})

const description = computed<string>(() => {
  if (value.value) {
    return t('module.setting.keyboard_shortcuts.enabled.description')
  }

  return t('module.setting.keyboard_shortcuts.disabled.description')
})
</script>

<template>
  <FormSection
    :title="t('module.setting.keyboard_shortcuts.title')"
    :description="t('module.setting.keyboard_shortcuts.description')"
  >
    <AppGroup
      spacing="6xl"
      align="start"
    >
      <VcSwitch
        v-model="computedValue"
        :label="label"
        :hint="description"
      />

      <VcButton
        :style="{
          viewTransitionName: 'example-button',
        }"
        variant="secondary"
        size="sm"
      >
        <AppGroup>
          <span
            :style="{
              viewTransitionName: 'example-button-label',
            }"
          >
            {{ t('module.setting.keyboard_shortcuts.example_button') }}
          </span>

          <VcKeyboardShortcut
            v-if="computedValue && isKeyboardShortcutHintVisible"
            :style="{
              viewTransitionName: 'example-button-shortcut',
            }"
            :keyboard-keys="['meta', 'k']"
            keyboard-classes="border-0 bg-tertiary"
          />
        </AppGroup>
      </VcButton>
    </AppGroup>
  </FormSection>
</template>

<style>
::view-transition-group(example-button),
::view-transition-group(example-button-label),
::view-transition-group(example-button-shortcut) {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

::view-transition-new(example-button),
::view-transition-new(example-button-label),
::view-transition-new(example-button-shortcut) {
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}

::view-transition-old(example-button),
::view-transition-old(example-button-label),
::view-transition-old(example-button-shortcut) {
  mix-blend-mode: normal;
  height: 100%;
  width: 100%;
  transform-origin: center;
}
</style>
