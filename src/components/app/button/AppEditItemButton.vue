<script setup lang="ts" generic="TRoute extends keyof Routes">
import { AppRouterLinkButton } from '@wisemen/vue-core'

import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcuts.constant'
import type { Routes } from '@/routes/routes'
import type { RouteLocationTyped } from '@/types/router/router.type'

const props = defineProps<{
  label: string
  to: RouteLocationTyped<TRoute>
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
