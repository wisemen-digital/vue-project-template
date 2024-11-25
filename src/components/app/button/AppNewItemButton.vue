<script setup lang="ts">
import {
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcRouterLinkButton,
} from '@wisemen/vue-core'

import AppGroup from '@/components/app/AppGroup.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'
import type { RouteLocationCurrent } from '@/types/global/vueRouter'

const props = defineProps<{
  label: string
  to: RouteLocationCurrent
}>()

const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()
</script>

<template>
  <VcKeyboardShortcutProvider
    v-slot="{ keys }"
    :config="{
      keys: ['n'],
    }"
  >
    <VcRouterLinkButton
      :to="props.to"
      :keyboard-shortcut="KEYBOARD_SHORTCUT.NEW"
      icon-left="plus"
      size="sm"
    >
      <AppGroup>
        {{ props.label }}

        <VcKeyboardShortcut
          v-if="isKeyboardShortcutHintVisible"
          :keyboard-keys="keys"
          keyboard-classes="border-0 bg-white/10"
        />
      </AppGroup>
    </VcRouterLinkButton>
  </VcKeyboardShortcutProvider>
</template>
