<script setup lang="ts">
import {
  type Component,
  defineAsyncComponent,
} from 'vue'

const props = defineProps<{
  component: Promise<Component>
}>()

const asyncComponent = defineAsyncComponent(() => props.component)
</script>

<template>
  <component
    :is="asyncComponent"
    :key="asyncComponent"
  />
</template>
