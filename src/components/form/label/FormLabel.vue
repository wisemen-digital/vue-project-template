<script setup lang="ts">
import { computed } from 'vue'

import { formLabel } from './formLabel.style'

const props = withDefaults(
  defineProps<{
    id: string
    isDisabled?: boolean
    isInvalid?: boolean
    isRequired: boolean
    label: string
  }>(),
  {
    isDisabled: false,
    isRequired: false,
  },
)

const formLabelClasses = computed<string>(() =>
  formLabel({
    isDisabled: props.isDisabled,
    isInvalid: props.isInvalid,
  }),
)

const computedLabel = computed<null | string>(() => {
  return props.isRequired ? `${props.label} *` : props.label
})
</script>

<template>
  <label
    :class="formLabelClasses"
    :for="props.id"
  >
    {{ computedLabel }}
  </label>
</template>
