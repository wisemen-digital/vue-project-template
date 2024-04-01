<script lang="ts" setup>
import {
  AppButton,
  AppIcon,
  Icon,
} from '@wisemen/vue-core'
import { computed } from 'vue'

const props = defineProps<{
  isDarkMode: boolean
}>()

const icon = computed<Icon>(() => props.isDarkMode ? 'eyeSlash' : 'eye')
</script>

<template>
  <AppButton
    :variant="props.isDarkMode ? 'secondary' : 'default'"
    class="rounded-full"
    size="icon"
  >
    <AppIcon
      :icon="icon"
    />
  </AppButton>
</template>
