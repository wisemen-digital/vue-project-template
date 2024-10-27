<script setup lang="ts">

</script>

<template>
  <div class="w-80 rounded-xl border border-solid border-secondary bg-primary">
    <!-- macOS top bar -->
    <div class="flex items-center gap-x-1 border-b border-solid border-secondary p-2">
      <div class="size-2.5 rounded-full bg-error-400" />
      <div class="size-2.5 rounded-full bg-warning-400" />
      <div class="size-2.5 rounded-full bg-success-400" />
    </div>

    <div class="grid grid-cols-[5rem,auto] p-2">
      <div class="py-1">
        <!-- Profile -->
        <div class="flex items-center gap-x-2">
          <div class="size-4 rounded-full bg-quaternary" />
          <div class="h-2.5 w-12 rounded-lg bg-quaternary" />
        </div>

        <!-- Navigation -->
        <div class="my-4 flex flex-col gap-y-2">
          <div
            v-for="i in 5"
            :key="i"
            class="h-2.5 w-12 rounded-lg bg-quaternary"
          />
        </div>
      </div>

      <!-- Page content -->
      <div class="px-2 py-0.5">
        <div class="flex items-center justify-between">
          <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
          <span class="text-sm font-bold text-tertiary">
            Dashboard
          </span>

          <div class="h-2.5 w-8 rounded-2xl bg-quaternary" />
        </div>

        <div class="mt-2 h-28 w-full rounded-xl bg-tertiary" />
      </div>
    </div>
  </div>
</template>
