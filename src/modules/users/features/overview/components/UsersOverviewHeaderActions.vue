<script setup lang="ts">
import type { Pagination } from '@wisemen/vue-core'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import AppNewItemButton from '@/components/app/AppNewItemButton.vue'
import AppSearchInput from '@/components/app/AppSearchInput.vue'
import { useDebouncedSearch } from '@/composables/debounce-search/debounceSearch.composable'
import type { UserIndexFilters } from '@/models/users/index/userIndexFilters.model'

const props = defineProps<{
  pagination: Pagination<UserIndexFilters>
}>()

const emit = defineEmits<{
  search: [value: null | string]
}>()

const { t } = useI18n()

const {
  debouncedSearch,
  search,
} = useDebouncedSearch(
  props.pagination.paginationOptions.value.filters?.search ?? '',
)

watch(debouncedSearch, () => {
  emit('search', debouncedSearch.value)
})
</script>

<template>
  <div class="flex gap-x-2">
    <AppSearchInput
      v-model="search"
      class="w-60"
    />

    <AppNewItemButton
      :to="{
        name: 'users-create',
      }"
      :label="t('users.overview.new_user')"
    />
  </div>
</template>
