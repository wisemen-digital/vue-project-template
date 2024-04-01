<script setup lang="ts" generic="TRoute extends keyof Routes">
import type { KeyboardKey } from '@wisemen/vue-core'
import {
  AppKeyboardCommand,
  AppRouterLinkButton,
  AppTooltip,
  useKeyboardCommand,
} from '@wisemen/vue-core'

import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import type { Routes } from '@/routes/routes'
import type { RouteLocationTyped } from '@/types/router/router.type'

const props = defineProps<{
  label: string
  to: RouteLocationTyped<TRoute>
}>()

const keys: KeyboardKey[] = [
  'ctrl',
  'n',
]

const router = useTypedRouter()

function navigate(): void {
  void router.push(props.to)
}

useKeyboardCommand({
  command: {
    keys,
    onPressed: navigate,
    type: 'combination',
  },
  scope: 'global',
})
</script>

<template>
  <AppTooltip
    :disable-hoverable-content="true"
    :delay-duration="300"
    side="bottom"
  >
    <AppRouterLinkButton
      :to="props.to"
      icon-left="plus"
    >
      {{ props.label }}
    </AppRouterLinkButton>

    <template #content>
      <div class="px-3 py-2">
        <AppKeyboardCommand
          :keys="keys"
          :has-border="true"
          command-type="combination"
        />
      </div>
    </template>
  </AppTooltip>
</template>
