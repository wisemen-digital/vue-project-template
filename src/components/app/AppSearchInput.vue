<script setup lang="ts">
import {
  AppButton,
  AppInput,
  AppKeyboardCommand,
  useKeyboardCommand,
} from '@wisemen/vue-core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  placeholder?: null | string
}>(), {
  placeholder: null,
})

const model = defineModel<null | string>({
  required: true,
})

const { t } = useI18n()

const appInputRef = ref<InstanceType<typeof AppInput> | null>(null)

useKeyboardCommand({
  command: {
    keys: [
      'meta',
      'f',
    ],
    onPressed: () => {
      appInputRef.value?.$el.focus()
    },
    type: 'combination',
  },
  scope: 'global',
})

function onClearInput(): void {
  model.value = null
}
</script>

<template>
  <AppInput
    ref="appInputRef"
    v-model="model"
    :placeholder="props.placeholder ?? t('components.search_input.placeholder')"
    type="search"
  >
    <template #right>
      <div class="mr-2">
        <AppKeyboardCommand
          v-if="model === null || model === ''"
          :keys="['meta', 'f']"
          command-type="combination"
        />

        <AppButton
          v-else
          variant="secondary"
          size="xs"
          @click="onClearInput"
        >
          {{ t('components.search_input.clear') }}
        </AppButton>
      </div>
    </template>
  </AppInput>
</template>
