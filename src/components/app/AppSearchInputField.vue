<script setup lang="ts">
import {
  AppIconButton,
  AppKeyboardShortcut,
  AppKeyboardShortcutProvider,
  AppTextField,
} from '@wisemen/vue-core'
import { ref, watch } from 'vue'

import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'
import { useI18n } from '@/composables/i18n/i18n.composable'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcut.constant'

const props = withDefaults(defineProps<{
  isLoading: boolean
  disableKeyboardCommand?: boolean
  placeholder?: null | string
}>(), {
  disableKeyboardCommand: false,
  placeholder: null,
})

const model = defineModel<string>({
  required: true,
})

const { t } = useI18n()

const { isDebouncing, search } = useDebounceSearch({
  defaultValue: model.value,
  onDebounceSearch: (search) => {
    model.value = search
  },
})

const appTextFieldRef = ref<InstanceType<typeof AppTextField> | null>(null)

function onClearInput(): void {
  model.value = ''
}

watch(() => model.value, (value) => {
  search.value = value
})
</script>

<template>
  <AppKeyboardShortcutProvider
    :config="KEYBOARD_SHORTCUT.SEARCH"
    class="w-72"
  >
    <AppTextField
      ref="appTextFieldRef"
      v-model="search"
      :placeholder="props.placeholder ?? t('component.search_input.placeholder')"
      :is-loading="props.isLoading || isDebouncing"
      icon-left="searchLg"
    >
      <template #right>
        <div>
          <AppKeyboardShortcut
            v-if="(model === null || model === '') && !props.disableKeyboardCommand"
            :keyboard-keys="KEYBOARD_SHORTCUT.SEARCH.keys"
            keyboard-classes="border-primary text-tertiary"
            class="mr-2"
          />

          <AppIconButton
            v-else-if="model !== null && model !== ''"
            :style-config="{
              '--icon-button-size-default': '32px',
              '--icon-button-icon-size-default': '16px',
              '--button-ring-color-focus': 'transparent',
              '--button-bg-color-focus': 'var(--bg-secondary-hover)',
              '--button-bg-color-disabled': 'transparent',
              '--button-border-color-disabled': 'transparent',
            }"
            :label="t('component.search_input.clear')"
            variant="tertiary"
            size="sm"
            icon="xClose"
            class="mr-[3px]"
            @click="onClearInput"
          />
        </div>
      </template>
    </AppTextField>
  </AppKeyboardShortcutProvider>
</template>
