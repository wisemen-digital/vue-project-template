<script setup lang="ts" generic="TFormType extends z.ZodType">
import { VcButton } from '@wisemen/vue-core'
import type { Form } from 'formango'
import {
  computed,
  onMounted,
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

onMounted(() => {
  focusedElement.value = document.activeElement as HTMLElement

  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement

    focusedElement.value = target
  })
})
</script>

<template>
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
    {{ props.label }}
  </VcButton>
</template>
