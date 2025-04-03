<script setup lang="ts">
import type { Component } from 'vue'

import { useInjectBaseDataItemContext } from '@/components/base/data-item/baseDataItem.context'

const props = withDefaults(defineProps<{
  /**
   * The HTML tag or component to use for the component.
   * @default 'span'
   */
  as?: string | Component
}>(), { as: 'span' })

const baseDataItemContext = useInjectBaseDataItemContext()
</script>

<template>
  <Component
    :is="props.as"
    :aria-labelledby="baseDataItemContext.id"
  >
    <slot />
  </Component>
</template>
