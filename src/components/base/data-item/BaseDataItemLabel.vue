<script setup lang="ts">
import { useInjectBaseDataItemContext } from '@/components/base/data-item/baseDataItem.context'

const baseDataItemContext = useInjectBaseDataItemContext()
</script>

<template>
  <span :id="baseDataItemContext.id">
    <slot />
  </span>
</template>
