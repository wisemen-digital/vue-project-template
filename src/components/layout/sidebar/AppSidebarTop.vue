<script setup lang="ts">
const props = defineProps<{
  isCollapsed: boolean
}>()

const logoSm = 'W'
const logoLg = 'Wisemen'
</script>

<template>
  <div
    class="
      p-xl text-primary pointer-events-none relative flex h-20 items-center
      justify-center font-medium tracking-widest uppercase
    "
  >
    <Transition
      enter-active-class="not-motion-reduce:duration-500 ease-sidebar-collapse"
      leave-active-class="not-motion-reduce:duration-500 ease-sidebar-collapse"
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
