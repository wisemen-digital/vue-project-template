<script setup lang="ts">
import {
  AppButton,
  AppInput,
  AppKeyboardCommand,
  useKeyboardCommand,
} from '@wisemen/vue-core'
import { ref } from 'vue'

const model = defineModel<null | string>({
  required: true,
})

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
    placeholder="Search..."
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
          Clear
        </AppButton>
      </div>
    </template>
  </AppInput>
</template>
