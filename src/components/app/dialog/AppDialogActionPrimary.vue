<script setup lang="ts">
import {
  AppButton,
  AppKeyboardKey,
  useKeyboardCommand,
} from '@wisemen/vue-core'

import AppButtonGroup from '@/components/app/AppButtonGroup.vue'

const props = withDefaults(defineProps<{
  isDestructive?: boolean
  isLoading?: boolean
  label: string
}>(), {
  isDestructive: false,
  isLoading: false,
})

const emit = defineEmits<{
  confirm: []
}>()

function onConfirm(): void {
  emit('confirm')
}

useKeyboardCommand({
  command: {
    keys: [
      'enter',
    ],
    onPressed: () => {
      if (document.activeElement instanceof HTMLButtonElement) {
        return
      }

      if (props.isLoading) {
        return
      }

      onConfirm()
    },
    type: 'combination',
  },
  scope: 'global',
})
</script>

<template>
  <AppButton
    :is-loading="props.isLoading"
    :variant="props.isDestructive ? 'destructive' : 'default'"
    @click="onConfirm"
  >
    <AppButtonGroup>
      {{ props.label }}

      <AppKeyboardKey
        keyboard-key="enter"
        class="bg-primary-foreground/20 !text-primary-foreground"
      />
    </AppButtonGroup>
  </AppButton>
</template>
