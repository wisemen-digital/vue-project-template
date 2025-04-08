<script setup lang="ts">
import { VcTableCell } from '@wisemen/vue-core-components'

const props = defineProps<{
  value: string
}>()
</script>

<template>
  <VcTableCell>
    {{ props.value }}
  </VcTableCell>
</template>
