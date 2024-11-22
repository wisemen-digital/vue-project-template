<script setup lang="ts" generic="TFormType extends z.ZodType">
import { VcButton } from '@wisemen/vue-core'
import type { Form } from 'formango'
import {
  computed,
  ref,
} from 'vue'
import type { z } from 'zod'

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
  isKeyboardCommandDisabled: false,
})

const buttonRef = ref<InstanceType<typeof VcButton> | null>(null)

const isButtonDisabled = computed<boolean>(() => {
  if (props.isDisabled) {
    return true
  }

  if (!props.isAlwaysEnabled) {
    return !(props.form.isDirty as boolean)
  }

  return false
})
</script>

<template>
  <VcButton
    ref="buttonRef"
    :form="props.formId"
    :is-disabled="isButtonDisabled"
    :is-loading="props.form.isSubmitting"
    :keyboard-shortcut="isKeyboardCommandDisabled ? null : KEYBOARD_SHORTCUT.SAVE"
    :style="{
      viewTransitionName: 'header-action-button',
    }"
    type="submit"
    class="w-full"
  >
    {{ props.label }}
  </VcButton>
</template>
