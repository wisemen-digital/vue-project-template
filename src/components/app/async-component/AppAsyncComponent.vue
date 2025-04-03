<script setup lang="ts">
import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'

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
