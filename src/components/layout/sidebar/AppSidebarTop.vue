<script setup lang="ts">
const props = defineProps<{
  isCollapsed: boolean
}>()

const logoSm = 'W'
const logoLg = 'Wisemen'
</script>

<template>
  <div class="pointer-events-none relative flex h-20 items-center justify-center p-xl font-medium uppercase tracking-widest text-primary">
    <Transition
      enter-active-class="duration-500 ease-sidebar-collapse"
      leave-active-class="duration-500 ease-sidebar-collapse"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <span
        v-if="props.isCollapsed"
        class="absolute left-1/2 -translate-x-1/2"
      >
        {{ logoSm }}
      </span>

      <span
        v-else
        class="absolute left-1/2 -translate-x-1/2"
      >
        {{ logoLg }}
      </span>
    </Transition>
  </div>
</template>
