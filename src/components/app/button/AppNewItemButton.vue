<script setup lang="ts">
import { VcRouterLinkButton } from '@wisemen/vue-core'

import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'
import type { RouteLocationCurrent } from '@/types/vueRouter'

const props = defineProps<{
  label: string
  to: RouteLocationCurrent
}>()
</script>

<template>
  <VcRouterLinkButton
    :to="props.to"
    :keyboard-shortcut="KEYBOARD_SHORTCUT.NEW"
    icon-left="plus"
  >
    {{ props.label }}
  </VcRouterLinkButton>
</template>
