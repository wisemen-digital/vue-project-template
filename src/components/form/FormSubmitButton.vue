<script setup lang="ts" generic="TFormType extends z.ZodType">
import { AppButton } from '@wisemen/vue-core'
import type { Form } from 'formango'
import {
  computed,
  ref,
} from 'vue'
import type { z } from 'zod'

import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'

const props = withDefaults(defineProps<{
  formId?: string | null
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

const buttonRef = ref<InstanceType<typeof AppButton> | null>(null)

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
  <AppButton
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
  </AppButton>
</template>
