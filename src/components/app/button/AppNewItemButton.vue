<script setup lang="ts">
import { AppRouterLinkButton } from '@wisemen/vue-core'

import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'
<<<<<<< Updated upstream
import type { RouteLocationCurrent } from '@/types/vueRouter'
=======
import type { Routes } from '@/routes/routes'
import type { RouteLocationTyped } from '@/types/router/router.type'
>>>>>>> Stashed changes

const props = defineProps<{
  label: string
  to: RouteLocationCurrent
}>()
</script>

<template>
  <AppRouterLinkButton
    :to="props.to"
    :keyboard-shortcut="KEYBOARD_SHORTCUT.NEW"
    icon-left="plus"
  >
    {{ props.label }}
  </AppRouterLinkButton>
</template>
