<script setup lang="ts" generic="T">
import { AppPageSkeletonLoader } from '@wisemen/vue-core'
import { AxiosError } from 'axios'
import { computed } from 'vue'

import { UseQueryReturnType } from '@/composables/query/query.composable'

import AppErrorState from './error-state/AppErrorState.vue'

const props = defineProps<{
  query: UseQueryReturnType<T>
}>()

const data = computed<T | null>(() => props.query.data.value)

const error = computed<AxiosError | null>(() => {
  const error = props.query.error.value

  if (error === null) {
    return null
  }

  if (error instanceof AxiosError) {
    return error
  }

  throw error
})

const isLoading = computed<boolean>(() => props.query.isLoading.value)
</script>

<template>
  <AppPageSkeletonLoader v-if="isLoading" />

  <div
    v-else-if="error !== null"
    class="flex flex-1 items-center justify-center"
  >
    <AppErrorState
      :error="error"
    />
  </div>

  <slot
    v-else-if="data !== null"
    :data="data"
  />
</template>
