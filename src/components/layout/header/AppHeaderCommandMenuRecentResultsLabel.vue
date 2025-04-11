<script setup lang="ts">
import { Motion } from 'motion-v'
import { useI18n } from 'vue-i18n'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'

const emit = defineEmits<{
  clear: []
}>()

const i18n = useI18n()

function onClearAll(): void {
  emit('clear')
}
</script>

<template>
  <Motion
    layout
  >
    <AppGroup
      align="center"
      class="mb-md text-white"
      justify="between"
    >
      <p
        class="text-xs"
      >
        {{ i18n.t('component.global_search.recent_results') }}
      </p>
      <AppUnstyledButton
        class="text-xs"
        @click="onClearAll"
      >
        {{ i18n.t('component.search_input.clear') }}
      </AppUnstyledButton>
    </AppGroup>
  </Motion>
</template>
