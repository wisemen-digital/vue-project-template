<script setup lang="ts">
import {
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcRouterLinkButton,
} from '@wisemen/vue-core'

import AppGroup from '@/components/app/AppGroup.vue'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'
import type { RouteLocationCurrent } from '@/types/vueRouter'

const props = defineProps<{
  label: string
  to: RouteLocationCurrent
}>()
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
          :keyboard-keys="keys"
          keyboard-classes="border-0 bg-white/10"
        />
      </AppGroup>
    </VcRouterLinkButton>
  </VcKeyboardShortcutProvider>
</template>
