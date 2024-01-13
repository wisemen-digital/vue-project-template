<script setup lang="ts">
import { formLabel } from './appFormLabel.style'

interface Props {
  /**
   * The label text to be displayed.
   */
  label: string
  
  /**
   *
   */
  id: string
  
  /**
   *
   */
  isDisabled: boolean
  
  /**
   *
   */
  isInvalid: boolean
  
  /**
   *
   */
  isRequired: boolean
}

const {
  label,
  id,
  isDisabled,
  isInvalid,
  isRequired,
} = defineProps<Props>()

const formLabelClasses = computed<string>(() =>
  formLabel({
    isInvalid,
    isDisabled,
  }),
)

const computedLabel = computed<string | null>(() => {
  if (label == null)
    return null
  
  return isRequired ? `${label} *` : label
})
</script>

<template>
  <label
    v-if="label !== null"
    :class="formLabelClasses"
    :for="id"
  >
    {{ computedLabel }}
  </label>
</template>
