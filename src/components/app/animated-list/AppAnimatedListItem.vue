<script setup lang="ts">
import { Motion } from 'motion-v'
</script>

<template>
  <Motion
    :exit="{
      opacity: 0,
      scale: 0.85,
    }"
    :initial="{
      opacity: 0,
      scale: 0.85,
    }"
    :animate="{
      opacity: 1,
      scale: 1,
    }"
    :layout="true"
    :transition="{
      type: 'spring',
      stiffness: 300,
      damping: 25,
    }"
    as="li"
  >
    <slot />
  </Motion>
</template>
