<script setup lang="ts">
import {
  AppButton,
  AppInput,
  AppKeyboardShortcut,
  AppKeyboardShortcutProvider,
} from '@wisemen/vue-core'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'
import { KEYBOARD_SHORTCUT } from '@/constants/keyboardShortcuts.constant'

const props = withDefaults(defineProps<{
  disableKeyboardCommand?: boolean
  isLoading: boolean
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

const appInputRef = ref<InstanceType<typeof AppInput> | null>(null)

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
    <AppInput
      ref="appInputRef"
      v-model="search"
      :placeholder="props.placeholder ?? t('components.search_input.placeholder')"
      :is-loading="props.isLoading || isDebouncing"
      icon-left="search"
      type="search"
    >
      <template #right>
        <div class="mr-2">
          <AppKeyboardShortcut
            v-if="(model === null || model === '') && !props.disableKeyboardCommand"
            :keys="KEYBOARD_SHORTCUT.SEARCH.keys"
            command-type="combination"
          />

          <AppButton
            v-else-if="model !== null && model !== ''"
            variant="secondary"
            size="xs"
            @click="onClearInput"
          >
            {{ t('components.search_input.clear') }}
          </AppButton>
        </div>
      </template>
    </AppInput>
  </AppKeyboardShortcutProvider>
</template>
