import type { Field } from 'formango'

export function toFormField<TValue, TDefaultValue>(field: Field<TValue, TDefaultValue>): {
  'isTouched': boolean
  'errorMessage': string | null
  'errors': string[]
  'modelValue': TDefaultValue extends undefined ? TValue | null : TValue
  'onBlur': () => void
  'onUpdate:modelValue': (value: TValue | null) => void
} {
  return {
    'isTouched': field.isTouched.value,
    'errorMessage': field.errors.value?.[0]?.message ?? null,
    'errors': field.errors.value.map((error) => error.message),
    'modelValue': field.modelValue.value,
    'onBlur': field.onBlur,
    'onUpdate:modelValue': field['onUpdate:modelValue'],
  }
}
