<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Icon } from '@wisemen/vue-core'
import { VcButton } from '@wisemen/vue-core'
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
  iconLeft?: Icon | null
  label: string
}>(), {
  formId: null,
  isAlwaysEnabled: false,
  isDisabled: false,
  iconLeft: null,
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
    :icon-left="props.iconLeft"
    :form="props.formId"
    :is-disabled="isButtonDisabled"
    :is-loading="props.form.isSubmitting"
    :keyboard-shortcut="KEYBOARD_SHORTCUT.SAVE"
    type="submit"
    class="w-full"
    size="sm"
  >
    {{ props.label }}
  </VcButton>
</template>
