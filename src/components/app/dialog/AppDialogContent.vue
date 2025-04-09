<script setup lang="ts">
import { VcDialogCloseButton } from '@wisemen/vue-core-components'
</script>

<template>
  <div class="px-4xl py-3xl overflow-y-auto">
    <slot />

    <div class="absolute top-2 right-2">
      <VcDialogCloseButton />
    </div>
  </div>
</template>
