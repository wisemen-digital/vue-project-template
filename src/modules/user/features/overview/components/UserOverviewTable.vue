<script setup lang="ts">
import type {
  PaginatedData,
  Pagination,
  TableColumn,
} from '@wisemen/vue-core'
import { AppTable } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'

const props = defineProps<{
  data: PaginatedData<UserIndex> | null
  isLoading: boolean
  pagination: Pagination<UserIndexFilters>
}>()

const emit = defineEmits<{
  clearFilters: []
}>()

const { t } = useI18n()

const columns = computed<TableColumn<UserIndex>[]>(() => [
  {
    id: 'uuid',
    isSortable: true,
    label: 'UUID',
    value: row => row.uuid,
    width: 'auto',
  },
  {
    id: 'name',
    isSortable: true,
    label: t('shared.name'),
    value: row => row.fullName,
    width: '500px',
  },
])

function onClearFilters(): void {
  emit('clearFilters')
}
</script>

<template>
  <AppTable
    :columns="columns"
    :data="props.data"
    :row-to="(row) => ({
      name: 'user-detail',
      params: {
        userUuid: row.uuid,
      },
    })"
    :filters="[]"
    :pin-first-column="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
    :title="t('shared.users')"
    @clear-filters="onClearFilters"
  />
</template>
