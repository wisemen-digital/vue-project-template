<script setup lang="ts" generic="TPagination extends BasePagination">
import { useDebounceSearch } from '@wisemen/vue-core'
import type {
  BasePagination,
  Pagination,
} from '@wisemen/vue-core-components'

import AppSearchInputField from '@/components/app/search/AppSearchInputField.vue'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  isLoading: boolean
  disableKeyboardCommand?: boolean
  pagination: Pagination<TPagination>
  placeholder?: string | null
}>(), {
  isDisabled: false,
  disableKeyboardCommand: false,
  placeholder: null,
})

const { search } = useDebounceSearch({
  onDebounceSearch: (value) => {
    props.pagination.handleSearchChange(value)
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
