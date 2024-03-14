<script lang="ts" setup>
import AppButton from '@/components/app/button/AppButton.vue'
import AppIcon from '@/components/app/icon/AppIcon.vue'

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
    <AppIcon :icon="props.isDarkMode ? 'eyeSlash' : 'eye'" />
  </AppButton>
</template>
