<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import type { z } from 'zod'

import AppFormSubmitButton from '@/components/form/form/AppFormSubmitButton.vue'

const props = defineProps<{
  form: Form<TFormType>
}>()
</script>

<template>
  <AppFormSubmitButton
    :form="props.form"
    :is-keyboard-command-disabled="true"
    class="mt-4"
  >
    <slot />
  </AppFormSubmitButton>
</template>
