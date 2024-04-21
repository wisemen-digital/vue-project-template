<script setup lang="ts">
import {
  AppButton,
  AppDialogCloseButton,
  AppKeyboardKey,
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
  <AppDialogCloseButton>
    <AppButton
      :is-disabled="isDisabled"
      variant="ghost"
    >
      <AppButtonGroup>
        {{ props.label }}

        <AppKeyboardKey
          keyboard-key="escape"
          class="!bg-black/5"
        />
      </AppButtonGroup>
    </AppButton>
  </AppDialogCloseButton>
</template>
