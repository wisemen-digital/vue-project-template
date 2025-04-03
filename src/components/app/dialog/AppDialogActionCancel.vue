<script setup lang="ts">
import {
  VcButton,
  VcDialogCloseButton,
  VcKeyboardKey,
} from '@wisemen/vue-core'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  label: string
}>(), { isDisabled: false })

const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()
</script>

<template>
  <VcDialogCloseButton>
    <VcButton
      :is-disabled="isDisabled"
      variant="tertiary"
      class="w-full"
    >
      <AppGroup>
        {{ props.label }}

        <VcKeyboardKey
          v-if="isKeyboardShortcutHintVisible"
          keyboard-key="escape"
          class="border-tertiary bg-secondary text-tertiary"
        />
      </AppGroup>
    </VcButton>
  </VcDialogCloseButton>
</template>
