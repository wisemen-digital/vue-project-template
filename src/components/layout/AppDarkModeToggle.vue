<script lang="ts" setup>
import { AppButton, AppIcon } from '@wisemen/vue-core'

const props = defineProps<{
  isDarkMode: boolean
}>()
</script>

<template>
  <AppButton
    :variant="props.isDarkMode ? 'secondary' : 'default'"
    class="rounded-full"
    size="icon"
  >
    <AppIcon
      :icon="props.isDarkMode
        ? 'eyeSlash'
        : 'eye'"
    />
  </AppButton>
</template>
