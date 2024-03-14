<script setup lang="ts">
import { computed, ref } from 'vue'

import AppFocusable from '@/components/app/focusable/AppFocusable.vue'
import AppIcon from '@/components/app/icon/AppIcon.vue'
import type { Icon } from '@/icons/icons'

import FormInput from './FormInput.vue'

const props = defineProps<{
  label: string
}>()

const value = defineModel<null | string>({
  required: true,
})

const isPasswordVisible = ref<boolean>(false)

const inputType = computed<'password' | 'text'>(() => {
  return isPasswordVisible.value ? 'text' : 'password'
})

const passwordIcon = computed<Icon>(() => {
  return isPasswordVisible.value ? 'eyeSlash' : 'eye'
})

function handleTogglePassword(): void {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <FormInput
    v-model="value"
    :label="props.label"
    :type="inputType"
    class="pr-10"
  >
    <template #right>
      <div class="absolute right-1.5 top-0 mr-0 flex h-full items-center">
        <AppFocusable @click="handleTogglePassword">
          <AppIcon
            :icon="passwordIcon"
            class="box-content p-2"
            size="sm"
          />
        </AppFocusable>
      </div>
    </template>
  </FormInput>
</template>
