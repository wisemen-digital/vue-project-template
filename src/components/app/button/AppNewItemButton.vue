<script setup lang="ts">
import {
  VcKeyboardShortcutProvider,
  VcRouterLinkButton,
} from '@wisemen/vue-core'

import AppButtonTooltip from '@/components/app/tooltip/AppButtonTooltip.vue'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'
import type { RouteLocationCurrent } from '@/types/global/vueRouter'

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
    <AppButtonTooltip
      :label="props.label"
      :keyboard-shortcut-keys="keys"
    >
      <VcRouterLinkButton
        :to="props.to"
        :keyboard-shortcut="KEYBOARD_SHORTCUT.NEW"
        icon-left="plus"
        size="sm"
      >
        {{ props.label }}
      </VcRouterLinkButton>
    </AppButtonTooltip>
  </VcKeyboardShortcutProvider>
</template>
