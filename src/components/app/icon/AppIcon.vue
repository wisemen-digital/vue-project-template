<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef, watch } from 'vue'

import type { IconProps } from '@/components/app/icon/appIcon.style'
import { iconVariants } from '@/components/app/icon/appIcon.style'
import type { Icon } from '@/icons/icons'
import { icons } from '@/icons/icons'
import { cn } from '@/utils/style.util'

const props = withDefaults(
  defineProps<{
    icon: Icon
    size?: IconProps['size']
  }>(),
  {
    size: 'default',
  },
)

const svgComponent = shallowRef<Component | null>(null)

watch(
  () => props.icon,
  async () => {
    const resolvedComponent = await icons[props.icon]
    svgComponent.value = resolvedComponent.default
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <Component
    :is="svgComponent"
    v-if="svgComponent !== null"
    :class="cn(iconVariants({ size }))"
  />
</template>
