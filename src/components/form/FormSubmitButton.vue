<script setup lang="ts" generic="TFormType extends z.ZodType">
import {
  VcButton,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
} from '@wisemen/vue-core'
import type { Form } from 'formango'
import {
  computed,
  onMounted,
  ref,
} from 'vue'
import type { z } from 'zod'

import AppGroup from '@/components/app/AppGroup.vue'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'

const props = withDefaults(defineProps<{
  formId?: null | string
  isAlwaysEnabled?: boolean
  isDisabled?: boolean
  isKeyboardCommandDisabled?: boolean
  form: Form<TFormType>
  label: string
}>(), {
  formId: null,
  isAlwaysEnabled: false,
  isDisabled: false,
})

const buttonRef = ref<InstanceType<typeof VcButton> | null>(null)
const focusedElement = ref<HTMLElement | null>(null)

const isButtonDisabled = computed<boolean>(() => {
  if (props.isDisabled) {
    return true
  }

  if (!props.isAlwaysEnabled) {
    return !(props.form.isDirty as boolean)
  }

  return false
})

const isFocusedElementAButton = computed<boolean>(() => {
  return focusedElement.value instanceof HTMLButtonElement
})

onMounted(() => {
  focusedElement.value = document.activeElement as HTMLElement

  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement

    focusedElement.value = target
  })
})
</script>

<template>
  <VcKeyboardShortcutProvider
    v-slot="{ keys }"
    :config="{
      isDisabled: computed<boolean>(() => isFocusedElementAButton),
      keys: KEYBOARD_SHORTCUT.SAVE.keys,
    }"
    class="w-full"
  >
    <VcButton
      ref="buttonRef"
      :form="props.formId"
      :is-disabled="isButtonDisabled"
      :is-loading="props.form.isSubmitting"
      :keyboard-shortcut="KEYBOARD_SHORTCUT.SAVE"
      :style="{
        viewTransitionName: 'header-action',
      }"
      type="submit"
      class="w-full"
      size="sm"
    >
      <AppGroup>
        {{ props.label }}qsdkjqdkqsj

        <VcKeyboardShortcut
          :keyboard-keys="keys"
          keyboard-classes="border-white/10 bg-white/10"
        />
      </AppGroup>
    </VcButton>
  </VcKeyboardShortcutProvider>
</template>
