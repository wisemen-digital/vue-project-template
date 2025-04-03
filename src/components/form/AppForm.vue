<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import {
  computed,
  onUnmounted,
  useId,
  watch,
} from 'vue'
import type { z } from 'zod'

import { usePageLoader } from '@/composables/page-loader/pageLoader.composable'
import { useUnsavedChanges } from '@/composables/unsaved-changes/unsavedChanges.composable'

const props = withDefaults(defineProps<{
  /**
   * When `true`, the user can exit the form when it has unsaved changes
   * instead of showing a confirmation dialog.
   * @default false
   */
  canExitWhenDirty?: boolean
  form: Form<TFormType>
}>(), { canExitWhenDirty: false })

const formId = useId()
const pageLoader = usePageLoader()

if (!props.canExitWhenDirty) {
  useUnsavedChanges(computed<boolean>(() => props.form.isDirty && !props.form.isSubmitting))
}

watch(
  () => props.form.isSubmitting,
  (isSubmitting) => {
    pageLoader.setIsLoading(isSubmitting.value)
  },
)

onUnmounted(() => {
  pageLoader.setIsLoading(false)
})
</script>

<template>
  <form
    :id="formId"
    class="@container/form-layout flex size-full flex-1 flex-col"
    novalidate
    @submit.prevent="props.form.submit"
  >
    <slot :form-id="formId" />
  </form>
</template>
