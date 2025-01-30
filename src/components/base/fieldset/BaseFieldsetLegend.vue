<script setup lang="ts">
import type { Component } from 'vue'

import { useInjectBaseFieldsetContext } from '@/components/base/fieldset/baseFieldset.context'

const props = defineProps<{
  as: string | Component
}>()

const baseFieldsetContext = useInjectBaseFieldsetContext()
</script>

<template>
  <Component
    :is="props.as"
    :id="baseFieldsetContext.id"
  >
    <slot />
  </Component>
</template>
