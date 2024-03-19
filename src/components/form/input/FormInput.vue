<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import AppInput from '@/components/app/input/AppInput.vue'
import FormGroup from '@/components/form/group/FormGroup.vue'
import FormLabel from '@/components/form/label/FormLabel.vue'
import { useIsFormInvalid } from '@/composables/form/form.composable.ts'
import type { FormErrors } from '@/types/form/formErrors.type.ts'
import { generateUuid } from '@/utils/uuid/generateUuid.util.ts'

const props = withDefaults(
  defineProps<{
    class?: null | string
    errors?: FormErrors
    isDisabled?: boolean
    isRequired?: boolean
    isTouched?: boolean
    label: string
    modelValue: null | string
    placeholder?: null | string
  }>(),
  {
    class: null,
    errors: undefined,
    isDisabled: false,
    isRequired: false,
    isTouched: false,
    placeholder: null,
  },
)

const emit = defineEmits<{
  'blur': []
  'update:modelValue': [value: string]
}>()

const model = computed<null | string>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value ?? '')
  },
})

const attrs = useAttrs()

const formId = computed<string>(() => `form-input-${generateUuid()}`)
const errors = computed<FormErrors | undefined>(() => props.errors)
const isTouched = computed<boolean>(() => props.isTouched ?? false)

const isFormInvalid = useIsFormInvalid(errors, isTouched)

function onBlur(): void {
  emit('blur')
}
</script>

<template>
  <FormGroup>
    <FormLabel
      v-if="label"
      :id="formId"
      :is-disabled="props.isDisabled"
      :is-invalid="isFormInvalid"
      :is-required="props.isRequired"
      :label="props.label"
    />

    <AppInput
      :id="formId"
      v-bind="attrs"
      v-model="model"
      :class="props.class"
      :is-disabled="props.isDisabled"
      :is-invalid="isFormInvalid"
      :placeholder="props.placeholder"
      @blur="onBlur"
    >
      <template #right>
        <slot name="right" />
      </template>
    </AppInput>
  </FormGroup>
</template>
