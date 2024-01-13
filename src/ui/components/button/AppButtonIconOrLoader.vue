<script setup lang="ts">

import type { ButtonProps } from './appButton.style'
import { buttonIcon } from './appButton.style'
import type { Icon } from '@/icons'

interface Props {
  icon: Icon
  isLoading: boolean
  size: ButtonProps['size']
  variant: ButtonProps['variant']
}

const { isLoading, size } = defineProps<Props>()

const buttonIconClasses = computed<string>(() =>
  buttonIcon({
    size,
  }),
)
</script>

<template>
  <div
    v-if="isLoading"
    :class="buttonIconClasses"
    class="relative"
  >
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <AppLoader class="h-4 w-4" />
    </div>
  </div>

  <AppIcon
    v-else
    :class="buttonIconClasses"
    :icon="icon"
  />
</template>
