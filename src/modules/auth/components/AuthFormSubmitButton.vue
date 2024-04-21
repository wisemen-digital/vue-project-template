<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import type { z } from 'zod'

import FormSubmitButton from '@/components/form/FormSubmitButton.vue'

const props = defineProps<{
  form: Form<TFormType>
  label: string
}>()
</script>

<template>
  <FormSubmitButton
    :form="props.form"
    :label="props.label"
    :is-keyboard-command-disabled="true"
    class="mt-6"
  >
    <slot />
  </FormSubmitButton>
</template>
