<script setup lang="ts">
import { VcDialogCloseButton } from '@wisemen/vue-core'
</script>

<template>
  <div class="overflow-y-auto px-4xl py-3xl">
    <slot />

    <div class="absolute right-2 top-2">
      <VcDialogCloseButton />
    </div>
  </div>
</template>
