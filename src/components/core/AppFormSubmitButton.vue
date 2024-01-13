<script setup lang="ts">
import type { Form } from 'formango'

import type { Routes } from '@/plugins'
import type { Props as ButtonProps } from '@/ui/components/button/AppButton.vue'

interface Props extends Omit<ButtonProps<keyof Routes>, 'form'> {
  form: Form<any>
  isAlwaysEnabled?: boolean
  isDisabled?: boolean
}

const {
  form,
  iconLeft,
  isAlwaysEnabled = false,
  isDisabled = false,
} = defineProps<Props>()

const isButtonDisabled = computed<boolean>(() => {
  if (isDisabled)
    return true
  
  if (!isAlwaysEnabled)
    return !form.isDirty
  
  return false
})
</script>

<template>
  <AppButton
    :icon-left="iconLeft"
    :is-disabled="isButtonDisabled"
    :is-loading="form.isSubmitting"
    type="submit"
    @click="form.submit"
  >
    <slot />
  </AppButton>
</template>
