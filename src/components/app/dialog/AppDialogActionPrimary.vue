<script setup lang="ts">
import {
  VcButton,
  VcKeyboardKey,
  VcKeyboardShortcutProvider,
} from '@wisemen/vue-core'
import {
  computed,
  onMounted,
  ref,
} from 'vue'

import AppGroup from '@/components/app/group/AppGroup.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

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

const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()

function onConfirm(): void {
  emit('confirm')
}

const focusedElement = ref<HTMLElement | null>(null)

const isFocusedElementAButton = computed<boolean>(() => {
  return focusedElement.value instanceof HTMLButtonElement
})

onMounted(() => {
  focusedElement.value = document.activeElement as HTMLElement

  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement

    focusedElement.value = target
  })
})
</script>

<template>
  <VcKeyboardShortcutProvider
    :config="{
      keys: ['enter'],
      isDisabled: computed<boolean>(() => isFocusedElementAButton),
    }"
    class="w-full"
  >
    <VcButton
      :is-loading="props.isLoading"
      :variant="props.isDestructive ? 'destructive-primary' : 'default'"
      class="group w-full"
      @click="onConfirm"
    >
      <AppGroup>
        {{ props.label }}

        <VcKeyboardKey
          v-if="isKeyboardShortcutHintVisible"
          keyboard-key="enter"
          class="border-white/10 bg-white/10 duration-200"
        />
      </AppGroup>
    </VcButton>
  </VcKeyboardShortcutProvider>
</template>
