<script setup lang="ts" generic="TFormType extends z.ZodType">
import {
  AppButton,
  AppKeyboardKey,
  useKeyboardCommand,
} from '@wisemen/vue-core'
import type { Form } from 'formango'
import { computed, ref } from 'vue'
import type { z } from 'zod'

import { onCreated } from '@/utils/createdHook.util'

const props = withDefaults(defineProps<{
  form: Form<TFormType>
  formId?: null | string
  isAlwaysEnabled?: boolean
  isDisabled?: boolean
  isKeyboardCommandDisabled?: boolean
  label: string
}>(), {
  formId: null,
  isAlwaysEnabled: false,
  isDisabled: false,
  isKeyboardCommandDisabled: false,
})

const buttonRef = ref<InstanceType<typeof AppButton> | null>(null)

const isButtonDisabled = computed<boolean>(() => {
  if (props.isDisabled) {
    return true
  }

  if (!props.isAlwaysEnabled) {
    return !(props.form.isDirty as boolean)
  }

  return false
})

function initKeyboardCommand(): void {
  if (props.isKeyboardCommandDisabled) {
    return
  }

  useKeyboardCommand({
    command: {
      keys: [
        'ctrl',
        's',
      ],
      onPressed: () => {
        if (props.form.isDirty) {
          buttonRef.value?.$el.click()
        }
      },
      type: 'combination',
    },
    scope: 'global',
  })
}

onCreated(() => {
  if (!props.isKeyboardCommandDisabled) {
    initKeyboardCommand()
  }
})
</script>

<template>
  <AppButton
    ref="buttonRef"
    :form="props.formId"
    :is-disabled="isButtonDisabled"
    :is-loading="props.form.isSubmitting"
    type="submit"
    class="w-full"
  >
    <div class="flex items-center gap-x-2">
      {{ props.label }}

      <div
        v-if="!props.isKeyboardCommandDisabled"
        class="flex"
      >
        <AppKeyboardKey
          keyboard-key="ctrl"
          class="ml-1 bg-primary-foreground/20 !text-primary-foreground"
        />

        <AppKeyboardKey
          keyboard-key="s"
          class="ml-1 bg-primary-foreground/20 !text-primary-foreground"
        />
      </div>
    </div>
  </AppButton>
</template>,
