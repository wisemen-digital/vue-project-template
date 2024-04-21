<script setup lang="ts" generic="TRoute extends keyof Routes">
import type { KeyboardKey } from '@wisemen/vue-core'
import {
  AppKeyboardKey,
  AppRouterLinkButton,
  useKeyboardCommand,
} from '@wisemen/vue-core'
import { ref } from 'vue'

import type { Routes } from '@/routes/routes'
import type { RouteLocationTyped } from '@/types/router/router.type'

const props = defineProps<{
  label: string
  to: RouteLocationTyped<TRoute>
}>()

const routerLinkButtonRef = ref<InstanceType<typeof AppRouterLinkButton> | null>(null)

const keys: KeyboardKey[] = [
  'n',
]

useKeyboardCommand({
  command: {
    keys,
    onPressed: () => {
      routerLinkButtonRef.value?.$el.click()
    },
    type: 'combination',
  },
  scope: 'global',
})
</script>

<template>
  <AppRouterLinkButton
    ref="routerLinkButtonRef"
    :to="props.to"
    icon-left="plus"
  >
    <div class="flex items-center gap-x-2">
      {{ props.label }}

      <AppKeyboardKey
        keyboard-key="n"
        class="ml-1 bg-primary-foreground/20 !text-primary-foreground"
      />
    </div>
  </AppRouterLinkButton>
</template>
