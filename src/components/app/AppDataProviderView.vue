<script setup lang="ts" generic="TQueries">
import { VcSkeletonItem } from '@wisemen/vue-core'
import type { UseQueryReturnType } from '@wisemen/vue-core-query'
import { computed } from 'vue'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'

const props = defineProps<{
  queries: {
    [KQuery in keyof TQueries]: UseQueryReturnType<TQueries[KQuery]>
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

interface ApiError {
  message: string
  status: number
}

const error = computed<ApiError | null>(() => {
  for (const key in props.queries) {
    const error = props.queries[key].error.value

    if (error !== null && error instanceof TypeError && 'message' in error && 'status' in error) {
      return {
        message: error.message as string,
        status: error.status as number,
      }
    }
    else if (error !== null) {
      throw error
    }
  }

  return null
})

const data = computed<{
  [KQuery in keyof TQueries]: TQueries[KQuery]
}>(() => {
  const data = {} as any

  for (const key in props.queries) {
    data[key] = props.queries[key].data.value
  }

  return data
})
</script>

<template>
  <!-- TODO: page skeleton -->
  <VcSkeletonItem v-if="isLoading" />

  <div
    v-else-if="error !== null"
    class="flex flex-1 items-center justify-center"
  >
    <AppErrorState
      :error="error"
    />
  </div>

  <template v-else>
    <slot :data="data" />
  </template>
</template>
