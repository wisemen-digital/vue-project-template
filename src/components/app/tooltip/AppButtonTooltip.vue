<script setup lang="ts">
import type { VcKeyboardKeyProps } from '@wisemen/vue-core-components'
import {
  VcKeyboardShortcut,
  VcTooltip,
} from '@wisemen/vue-core-components'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

const props = withDefaults(defineProps<{
  keyboardShortcutKeys?: VcKeyboardKeyProps['keyboardKey'][]
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
          :class-config="{
            root: 'border-primary bg-secondary',
            keyboardKey: {
              key: 'text-primary',
            },
          }"
          keyboard-classes="bg-tertiary text-tertiary"
        />
      </AppGroup>
    </template>
  </VcTooltip>
</template>
