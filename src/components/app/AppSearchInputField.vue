<script setup lang="ts">
import {
  type Pagination,
  VcIconButton,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcTextField,
} from '@wisemen/vue-core'
import {
  computed,
  ref,
} from 'vue'

import { useI18n } from '@/composables/i18n/i18n.composable'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  isLoading: boolean
  disableKeyboardCommand?: boolean
  pagination: Pagination<unknown>
  placeholder?: null | string
}>(), {
  isDisabled: false,
  disableKeyboardCommand: false,
  placeholder: null,
})

const { t } = useI18n()

let timeout: ReturnType<typeof setTimeout> | null = null

const search = computed<string>({
  get: () => props.pagination.paginationOptions.value.search ?? '',
  set: (value) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      props.pagination.handleSearchChange(value)
    }, 300)
  },
})

const VcTextFieldRef = ref<InstanceType<any> | null>(null)

function onClearInput(): void {
  props.pagination.handleSearchChange('')
}
</script>

<template>
  <VcKeyboardShortcutProvider
    :config="KEYBOARD_SHORTCUT.SEARCH"
    class="w-64"
  >
    <VcTextField
      ref="VcTextFieldRef"
      v-model="search"
      :is-disabled="props.isDisabled"
      :placeholder="props.placeholder ?? t('component.search_input.placeholder')"
      :is-loading="props.isLoading"
      icon-left="search"
    >
      <template #right>
        <div>
          <VcKeyboardShortcut
            v-if="(search === null || search === '') && !props.disableKeyboardCommand"
            :keyboard-keys="KEYBOARD_SHORTCUT.SEARCH.keys"
            keyboard-classes="border-primary text-tertiary"
            class="mr-md"
          />

          <VcIconButton
            v-else-if="search !== null && search !== ''"
            :style-config="{
              '--icon-button-size-default': '2rem',
              '--icon-button-icon-size-default': '1rem',
              '--button-ring-color-focus': 'transparent',
              '--button-bg-color-focus': 'var(--bg-secondary-hover)',
              '--button-bg-color-disabled': 'transparent',
              '--button-border-color-disabled': 'transparent',
            }"
            :label="t('component.search_input.clear')"
            variant="tertiary"
            size="sm"
            icon="close"
            class="mr-[0.1875rem]"
            @click="onClearInput"
          />
        </div>
      </template>
    </VcTextField>
  </VcKeyboardShortcutProvider>
</template>
