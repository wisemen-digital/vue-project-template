<script setup lang="ts">
import { computed } from 'vue'

import { useIsMounted } from '@/composables/is-mounted/isMounted.composable'

type TeleportTarget = 'body' | 'header-actions'

const props = defineProps<{
  target: TeleportTarget
}>()

const targetMap = new Map<TeleportTarget, string>([
  [
    'body',
    'body',
  ],
  [
    'header-actions',
    '#header-actions',
  ],
])

const isMounted = useIsMounted()

const teleportTarget = computed<string>(() => {
  const selectedTarget = targetMap.get(props.target) ?? null

  if (selectedTarget === null) {
    throw new Error(`Invalid teleport target: ${props.target}`)
  }

  return selectedTarget
})
</script>

<template>
  <Teleport
    v-if="isMounted"
    :to="teleportTarget"
  >
    <slot />
  </Teleport>
</template>
