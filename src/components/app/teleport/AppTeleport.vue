<script setup lang="ts">
import { computed } from 'vue'

import { useIsMounted } from '@/composables/is-mounted/isMounted.composable'

const props = defineProps<{
  to: keyof typeof targets
}>()

const targets = {
  body: 'body',
  headerActions: '#header-actions',
} as const

const isMounted = useIsMounted()

const teleportTarget = computed<string>(() => {
  const selectedTarget = targets[props.to]

  if (selectedTarget === null) {
    throw new Error(`Invalid teleport target: ${props.to}`)
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
