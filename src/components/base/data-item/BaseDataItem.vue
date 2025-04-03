<script setup lang="ts">
import type { Component } from 'vue'
import { useId } from 'vue'

import { useProvideBaseDataItemContext } from '@/components/base/data-item/baseDataItem.context'

const props = withDefaults(defineProps<{
  as?: string | Component
}>(), { as: 'div' })

const id = useId()

useProvideBaseDataItemContext({ id })
</script>

<template>
  <Component :is="props.as">
    <slot />
  </Component>
</template>
