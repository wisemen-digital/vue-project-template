<script setup lang="ts" generic="TFormType extends z.ZodType">
import { AppButton } from '@wisemen/vue-core'
import type { Form } from 'formango'
import { computed } from 'vue'
import type { z } from 'zod'

interface Props {
  form: Form<TFormType>
  isAlwaysEnabled?: boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isAlwaysEnabled: false,
  isDisabled: false,
})

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
    :is-disabled="isButtonDisabled"
    :is-loading="props.form.isSubmitting"
    type="submit"
    @click="props.form.submit"
  >
    <slot />
  </AppButton>
</template>
