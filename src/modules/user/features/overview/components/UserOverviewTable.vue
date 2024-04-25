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

const { t } = useI18n()

const columns = computed<TableColumn<UserIndex>[]>(() => [
  {
    id: 'uuid',
    isSortable: true,
    label: 'UUID',
    size: 'minmax(400px, 500px)',
    value: row => row.uuid,
  },
  {
    id: 'name',
    isSortable: true,
    label: t('shared.name'),
    size: '500px',
    value: row => row.fullName,
  },
])
</script>

<template>
  <AppTable
    :columns="columns"
    :data="props.data"
    :empty-message="t('users.overview.empty')"
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
  />
</template>
