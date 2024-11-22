<script setup lang="ts">
import {
  VcButton,
  VcDialogCloseButton,
  VcKeyboardKey,
} from '@wisemen/vue-core'

import AppButtonGroup from '@/components/app/AppButtonGroup.vue'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  label: string
}>(), {
  isDisabled: false,
})
</script>

<template>
  <VcDialogCloseButton>
    <VcButton
      :is-disabled="isDisabled"
      variant="tertiary"
      class="w-full"
    >
      <AppButtonGroup>
        {{ props.label }}

        <VcKeyboardKey
          keyboard-key="escape"
          class="border-tertiary bg-secondary text-tertiary"
        />
      </AppButtonGroup>
    </VcButton>
  </VcDialogCloseButton>
</template>
