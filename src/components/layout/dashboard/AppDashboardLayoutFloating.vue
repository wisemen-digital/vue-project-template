<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex size-full flex-1 bg-secondary">
    <slot name="sidebar" />

    <div class="z-[1] flex h-dvh flex-1 p-xl pl-xs">
      <div class="flex flex-1 rounded-2xl bg-primary shadow-lg">
        <RouterView />
      </div>
    </div>
  </div>
</template>
