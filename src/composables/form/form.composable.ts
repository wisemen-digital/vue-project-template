import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { FormErrors } from '@/types/form/formErrors.type.ts'

export function useIsFormInvalid(errors: ComputedRef<FormErrors>, isTouched: ComputedRef<boolean>,
): ComputedRef<boolean> {
  return computed<boolean>(() => {
    if (errors.value == null) {
      return false
    }

    return errors.value._errors.length > 0 && isTouched.value
  })
}
