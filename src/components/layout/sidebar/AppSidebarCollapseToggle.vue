<script setup lang="ts">
import { AppIcon, AppToggle } from '@wisemen/vue-core'
import { computed } from 'vue'

const isCollapsed = defineModel<boolean>({
  required: true,
})

const toggleBtnAriaLabel = computed<string>(() => {
  if (isCollapsed.value) {
    return 'Open sidebar'
  }

  return 'Close sidebar'
})
</script>

<template>
  <AppToggle
    v-model="isCollapsed"
    class="opacity-0 focus-visible:opacity-100 group-hover/sidebar:opacity-100"
  >
    <button
      :aria-label="toggleBtnAriaLabel"
      class="absolute right-0 top-4 flex h-10 w-5 translate-x-1/2 items-center justify-center rounded-2xl border border-solid border-secondary bg-secondary text-fg-disabled outline-none ring-fg-tertiary ring-offset-1 duration-300 focus-visible:ring-2"
    >
      <AppIcon
        :class="{
          'rotate-180': isCollapsed,
        }"
        class="duration-300"
        icon="chevronLeft"
      />
    </button>
  </AppToggle>
</template>
