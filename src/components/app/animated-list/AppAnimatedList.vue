<script setup lang="ts">
import { AnimatePresence } from 'motion-v'
</script>

<template>
  <AnimatePresence
    :multiple="true"
    :initial="false"
    mode="popLayout"
    as="ul"
  >
    <slot />
  </AnimatePresence>
</template>
