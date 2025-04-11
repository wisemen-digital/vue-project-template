<script setup lang="ts">
import { VcTableCell } from '@wisemen/vue-core'

import type { Address } from '@/models/address/address.model.ts'

import { AddressUtil } from '../../../../../utils/address.util.ts'

const props = defineProps<{
  address: Address
}>()
</script>

<template>
  <VcTableCell>
    <span>
      {{ AddressUtil.format(props.address) }}
    </span>
  </VcTableCell>
</template>
