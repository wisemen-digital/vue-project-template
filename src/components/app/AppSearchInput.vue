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

const appInputRef = ref<InstanceType<typeof AppInput> | null>(null)

if (!props.disableKeyboardCommand) {
  useKeyboardCommand({
    command: {
      keys: [
        'meta',
        'f',
      ],
      onPressed: (e) => {
        appInputRef.value?.$el.focus()
        e.preventDefault()
      },
      type: 'combination',
    },
    scope: 'global',
  })
}

function onClearInput(): void {
  model.value = ''
}
</script>

<template>
  <AppInput
    ref="appInputRef"
    v-model="model"
    :placeholder="props.placeholder ?? t('components.search_input.placeholder')"
    type="search"
    class="w-72"
  >
    <template #right>
      <div class="mr-2">
        <AppKeyboardCommand
          v-if="(model === null || model === '') && !props.disableKeyboardCommand"
          :keys="['meta', 'f']"
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
</template>
