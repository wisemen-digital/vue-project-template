<script setup lang="ts">
import { Switch } from '@headlessui/vue'

interface Props {
  isDisabled?: boolean
}

const { isDisabled = false } = defineProps<Props>()

const emit = defineEmits<{
  (event: 'focus', e: FocusEvent): void
  (event: 'blur', e: FocusEvent): void
}>()

const isSelected = defineModel<boolean>({
  required: true,
})

function onFocus(e: FocusEvent): void {
  emit('focus', e)
}

function onBlur(e: FocusEvent): void {
  emit('blur', e)
}
</script>

<template>
  <Switch
    v-model="isSelected"
    :class="[
      isSelected ? 'border-primary bg-primary' : 'border-border',
      {
        'cursor-not-allowed opacity-50': isDisabled,
      },
    ]"
    :disabled="isDisabled"
    class="inline-flex h-5 w-5 items-center justify-center rounded border border-solid bg-background ring-primary ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    @blur="onBlur"
    @focus="onFocus"
  >
    <AppIcon
      v-if="isSelected"
      class="h-3 w-3 text-primary-foreground"
      icon="checkmark"
    />
  </Switch>
</template>
