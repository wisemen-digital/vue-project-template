<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  align?: 'center' | 'end' | 'start'
  direction?: 'col' | 'row'
  gap?: '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | '10xl' | '11xl' | 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs'
  justify?: 'between' | 'center' | 'end' | 'start'
}>(), {
  align: 'center',
  direction: 'row',
  gap: 'md',
  justify: 'start',
})

const gapClass = computed<string>(() => {
  switch (props.gap) {
    case '2xl':
      return 'gap-2xl'
    case '3xl':
      return 'gap-3xl'
    case '4xl':
      return 'gap-4xl'
    case '5xl':
      return 'gap-5xl'
    case '6xl':
      return 'gap-6xl'
    case '7xl':
      return 'gap-7xl'
    case '8xl':
      return 'gap-8xl'
    case '9xl':
      return 'gap-9xl'
    case '10xl':
      return 'gap-10xl'
    case '11xl':
      return 'gap-11xl'
    case 'lg':
      return 'gap-lg'
    case 'md':
      return 'gap-md'
    case 'none':
      return 'gap-none'
    case 'sm':
      return 'gap-sm'
    case 'xl':
      return 'gap-xl'
    case 'xs':
      return 'gap-xs'
    default:
      return 'gap-none'
  }
})

const justifyClass = computed<string>(() => {
  switch (props.justify) {
    case 'between':
      return 'justify-between'
    case 'center':
      return 'justify-center'
    case 'end':
      return 'justify-end'
    case 'start':
      return 'justify-start'
    default:
      return 'justify-start'
  }
})

const alignClass = computed<string>(() => {
  switch (props.align) {
    case 'center':
      return 'items-center'
    case 'end':
      return 'items-end'
    case 'start':
      return 'items-start'
    default:
      return 'items-start'
  }
})

const directionClass = computed<string>(() => {
  switch (props.direction) {
    case 'col':
      return 'flex-col'
    case 'row':
      return 'flex-row'
    default:
      return 'flex-row'
  }
})
</script>

<template>
  <div
    :class="[alignClass, justifyClass, gapClass, directionClass]"
    class="flex"
  >
    <slot />
  </div>
</template>
