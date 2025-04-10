<script setup lang="ts">
import { VcRouterLinkButton } from '@wisemen/vue-core-components'

import type { RouteLocationCurrent } from '@/types/global/vueRouter'

const props = defineProps<{
  label: string
  to: RouteLocationCurrent
}>()
</script>

<template>
  <VcRouterLinkButton
    :to="props.to"
    icon-left="edit"
  >
    {{ props.label }}
  </VcRouterLinkButton>
</template>
