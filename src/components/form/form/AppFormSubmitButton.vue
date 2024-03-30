<script setup lang="ts" generic="TFormType extends z.ZodType">
import {
  AppButton,
  AppKeyboardCommand,
  AppTooltip,
  useKeyboardCommand,
} from '@wisemen/vue-core'
import type { Form } from 'formango'
import { computed, ref } from 'vue'
import type { z } from 'zod'

import { onCreated } from '@/utils/createdHook.util'

interface Props {
  form: Form<TFormType>
  isAlwaysEnabled?: boolean
  isDisabled?: boolean
  isKeyboardCommandDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
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

onCreated(() => {
  if (!props.isKeyboardCommandDisabled) {
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
})
</script>

<template>
  <div class="w-full">
    <AppTooltip
      :is-hidden="props.isKeyboardCommandDisabled"
      side="bottom"
    >
      <AppButton
        ref="buttonRef"
        :is-disabled="isButtonDisabled"
        :is-loading="props.form.isSubmitting"
        type="submit"
        class="w-full"
        @click="props.form.submit"
      >
        <slot />
      </AppButton>

      <template #content>
        <AppKeyboardCommand
          v-if="!props.isKeyboardCommandDisabled"
          :keys="['ctrl', 's']"
          :has-border="true"
          command-type="combination"
        />
      </template>
    </AppTooltip>
  </div>
</template>,
