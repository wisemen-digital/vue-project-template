<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="grid h-screen grid-cols-1 md:grid-cols-2">
    <div class="flex flex-col justify-center px-6 py-20">
      <div class="mx-auto w-full max-w-80">
        <RouterView />
      </div>
    </div>

    <div class="bg-black" />
  </div>
</template>
