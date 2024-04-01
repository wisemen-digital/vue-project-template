<script setup lang="ts" generic="T">
import { AppPageSkeletonLoader } from '@wisemen/vue-core'
import { AxiosError } from 'axios'
import { computed } from 'vue'

import { UseQueryReturnType } from '@/composables/query/query.composable'

import AppErrorState from './error-state/AppErrorState.vue'

const props = defineProps<{
  queries: {
    [K in keyof T]: UseQueryReturnType<T[K]>
  }
}>()

const isLoading = computed<boolean>(() => {
  for (const key in props.queries) {
    if (props.queries[key].isLoading.value as boolean) {
      return true
    }
  }

  return false
})

const error = computed<AxiosError | null>(() => {
  for (const key in props.queries) {
    const error = props.queries[key].error.value

    if (error !== null && error instanceof AxiosError) {
      return error
    }
    else if (error !== null) {
      throw error
    }
  }

  return null
})

const data = computed<{
  [K in keyof T]: T[K]
}>(() => {
  const data = {} as any

  for (const key in props.queries) {
    data[key] = props.queries[key].data.value
  }

  return data
})
</script>

<template>
  <AppPageSkeletonLoader v-if="isLoading" />

  <div
    v-else-if="error !== null"
    class="flex flex-1 items-center justify-center"
  >
    <AppErrorState :error="error" />
  </div>

  <template v-else>
    <slot :data="data" />
  </template>
</template>
