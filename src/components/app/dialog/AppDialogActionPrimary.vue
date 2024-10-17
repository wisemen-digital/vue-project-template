<script setup lang="ts">
import {
  AppButton,
  AppKeyboardKey,
  AppKeyboardShortcutProvider,
} from '@wisemen/vue-core'
import {
  computed,
  onMounted,
  ref,
} from 'vue'

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
  <AppKeyboardShortcutProvider
    :config="{
      keys: ['enter'],
      isDisabled: computed<boolean>(() => isFocusedElementAButton),
    }"
    class="w-full"
  >
    <AppButton
      :is-loading="props.isLoading"
      :variant="props.isDestructive ? 'destructive-primary' : 'default'"
      class="group w-full"
      @click="onConfirm"
    >
      <AppButtonGroup>
        {{ props.label }}

        <AppKeyboardKey
          keyboard-key="enter"
          class="border-white/10 bg-white/10 duration-200"
        />
      </AppButtonGroup>
    </AppButton>
  </AppKeyboardShortcutProvider>
</template>
