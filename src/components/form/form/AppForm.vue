<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import { onUnmounted, watch } from 'vue'
import type { z } from 'zod'

import { usePageLoader } from '@/composables/page-loader/pageLoader.composable'

const props = defineProps<{
  form: Form<TFormType>
}>()

const { setIsLoading } = usePageLoader()

watch(
  () => props.form.isSubmitting,
  (isSubmitting) => {
    setIsLoading(isSubmitting)
  },
)

onUnmounted(() => {
  setIsLoading(false)
})
</script>

<template>
  <form
    class="flex size-full flex-1 flex-col @container/form-layout"
    novalidate
    @submit.prevent="props.form.submit"
  >
    <slot />
  </form>
</template>
