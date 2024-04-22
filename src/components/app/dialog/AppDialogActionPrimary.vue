<script setup lang="ts">
import { AppButton } from '@wisemen/vue-core'
import {
  computed,
  onMounted,
  ref,
} from 'vue'

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
  <AppButton
    :is-loading="props.isLoading"
    :variant="props.isDestructive ? 'destructive' : 'default'"
    :keyboard-shortcut="{
      keys: ['enter'],
      isDisabled: computed<boolean>(() => isFocusedElementAButton),
    }"
    @click="onConfirm"
  >
    {{ props.label }}
  </AppButton>
</template>
