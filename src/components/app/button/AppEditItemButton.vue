<script setup lang="ts">
import { AppRouterLinkButton } from '@wisemen/vue-core'

import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'
import type { RouteLocationCurrent } from '@/types/vueRouter'

const props = defineProps<{
  label: string
  to: RouteLocationCurrent
}>()
</script>

<template>
  <AppRouterLinkButton
    :to="props.to"
    :keyboard-shortcut="KEYBOARD_SHORTCUT.EDIT"
    icon-left="edit"
  >
    {{ props.label }}
  </AppRouterLinkButton>
</template>
