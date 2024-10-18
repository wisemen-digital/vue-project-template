<script setup lang="ts">
import { AppDialogCloseButton } from '@wisemen/vue-core'
</script>

<template>
  <div class="overflow-y-auto px-8 py-6">
    <slot />

    <div class="absolute right-2 top-2">
      <AppDialogCloseButton />
    </div>
  </div>
</template>
