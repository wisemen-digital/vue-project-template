<script setup lang="ts">
import type { Form } from 'formango'

import { usePageLoader } from '@/composables/core'

interface Props {
  form: Form<any>
}

const { form } = defineProps<Props>()

const { setIsLoading } = usePageLoader()

watch(
  () => form.isSubmitting,
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
    class="flex h-full w-full flex-1 flex-col @container/form-layout"
    novalidate
    @submit.prevent="form.submit"
  >
    <slot />
  </form>
</template>
