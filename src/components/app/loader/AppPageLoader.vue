<script setup lang="ts">
import { useRouter } from 'vue-router'

import { usePageLoader } from '@/composables/page-loader/pageLoader.composable'

const router = useRouter()
const {
  isLoading, setIsLoading,
} = usePageLoader()

let startLoadingTimeout: ReturnType<typeof setTimeout> | null = null

router.beforeEach(() => {
  if (startLoadingTimeout !== null) {
    clearTimeout(startLoadingTimeout)
  }

  startLoadingTimeout = setTimeout(() => {
    setIsLoading(true)
  }, 500)
})

router.afterEach(() => {
  if (startLoadingTimeout !== null) {
    clearTimeout(startLoadingTimeout)
  }

  setIsLoading(false)
})
</script>

<template>
  <Transition
    enter-active-class="duration-500"
    leave-active-class="duration-500"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 z-30 h-[3px] w-full"
    >
      <!-- eslint-disable-next-line tailwindcss/no-custom-classname -->
      <div class="loader bg-brand-primary-500 h-full w-1/2" />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@keyframes loader {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  25% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50% {
    transform: translateX(100%) scaleX(1);
    transform-origin: right;
  }
  100% {
    transform: translateX(100%) scaleX(0);
    transform-origin: right;
  }
}

.loader {
  animation: loader 1s linear infinite;
}
</style>
