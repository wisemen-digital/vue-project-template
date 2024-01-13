<script setup lang="ts">
import type { Form } from 'formango'

interface Props {
  form: Form<any>
}

const { form } = defineProps<Props>()
</script>

<template>
  <AppFormSubmitButton
    :form="form"
    class="mt-4"
  >
    <slot />
  </AppFormSubmitButton>
</template>
