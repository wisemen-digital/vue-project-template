<script lang="ts" setup>
import {
  AppIconButton,
  Icon,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  isDarkMode: boolean
}>()

const { t } = useI18n()

const icon = computed<Icon>(() => props.isDarkMode ? 'eyeSlash' : 'eye')
</script>

<template>
  <AppIconButton
    :variant="props.isDarkMode ? 'secondary' : 'default'"
    :icon="icon"
    :label="props.isDarkMode
      ? t('components.dark_mode_toggle.enable_light_mode')
      : t('components.dark_mode_toggle.enable_dark_mode')"
    class="rounded-full"
  />
</template>
