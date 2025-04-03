<script setup lang="ts">
import type { KeyboardKey } from '@wisemen/vue-core'
import {
  VcKeyboardShortcut,
  VcTooltip,
} from '@wisemen/vue-core'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

const props = withDefaults(defineProps<{
  keyboardShortcutKeys?: KeyboardKey[]
  label: string
}>(), { keyboardShortcutKeys: () => [] })

const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()
</script>

<template>
  <VcTooltip
    :is-arrow-hidden="true"
    :popover-offset-in-px="6"
    :disable-hoverable-content="true"
    :delay-duration="500"
    :is-hidden="!isKeyboardShortcutHintVisible"
    :style-config="{
      '--tooltip-bg-color-default': 'var(--bg-primary)',
      '--tooltip-border-color-default': 'var(--border-secondary)',
      '--tooltip-shadow-default': 'var(--shadow-sm)',
      '--tooltip-border-radius-default': 'var(--radius-sm)',
    }"
    popover-side="top"
  >
    <template #trigger>
      <slot />
    </template>

    <template #content>
      <AppGroup class="px-1.5 py-1">
        <span class="text-primary text-xs">
          {{ props.label }}
        </span>

        <VcKeyboardShortcut
          v-if="props.keyboardShortcutKeys.length > 0"
          :keyboard-keys="props.keyboardShortcutKeys"
          keyboard-classes="bg-tertiary text-tertiary"
        />
      </AppGroup>
    </template>
  </VcTooltip>
</template>
