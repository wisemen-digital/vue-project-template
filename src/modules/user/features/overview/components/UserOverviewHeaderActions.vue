<script setup lang="ts">
import type { Pagination } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import AppNewItemButton from '@/components/app/AppNewItemButton.vue'
import AppSearchInput from '@/components/app/AppSearchInput.vue'
import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'

const props = defineProps<{
  isLoading: boolean
  pagination: Pagination<UserIndexFilters>
}>()

const emit = defineEmits<{
  search: [value: null | string]
}>()

const { t } = useI18n()

const defaultSearchValue = props.pagination.paginationOptions.value.filters?.search ?? ''

const {
  isDebouncing,
  search,
} = useDebounceSearch({
  defaultValue: defaultSearchValue,
  onDebounceSearch: (value) => {
    emit('search', value)
  },
})
</script>

<template>
  <div class="flex gap-x-2">
    <AppSearchInput
      v-model="search"
      :is-loading="props.isLoading || isDebouncing"
      class="w-60"
    />

    <AppNewItemButton
      :to="{
        name: 'user-create',
      }"
      :label="t('users.overview.new_user')"
    />
  </div>
</template>
