<script setup lang="ts" generic="T">
import type { Pagination } from '@wisemen/vue-core'
import { computed } from 'vue'

import AppSearchInputField from '@/components/app/search/AppSearchInputField.vue'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  isLoading: boolean
  disableKeyboardCommand?: boolean
  pagination: Pagination<T>
  placeholder?: string | null
}>(), {
  isDisabled: false,
  disableKeyboardCommand: false,
  placeholder: null,
})

let timeout: ReturnType<typeof setTimeout> | null = null

const search = computed<string>({
  get: () => props.pagination.paginationOptions.value.search ?? '',
  set: (value) => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      props.pagination.handleSearchChange(value)
    }, 300)
  },
})
</script>

<template>
  <AppSearchInputField
    v-model="search"
    :is-disabled="props.isDisabled"
    :disable-keyboard-command="props.disableKeyboardCommand"
    :placeholder="props.placeholder"
    :is-loading="props.isLoading"
    class="w-64"
  />
</template>
