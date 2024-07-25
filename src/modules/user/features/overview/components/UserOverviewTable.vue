<script setup lang="ts">
import type {
  PaginatedData,
  Pagination,
  TableColumn,
} from '@wisemen/vue-core'
import { AppTable } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'
import { DateUtil } from '@/utils/date.util.ts'

const props = defineProps<{
  isLoading: boolean
  data: PaginatedData<UserIndex> | null
  pagination: Pagination<UserIndexFilters>
}>()

const { t } = useI18n()

const columns = computed<TableColumn<UserIndex>[]>(() => [
  {
    id: 'uuid',
    isSortable: true,
    label: 'UUID',
    value: (row): string => row.uuid,
    width: 'auto',
  },
  {
    id: 'name',
    isSortable: true,
    label: t('shared.name'),
    value: (row): string => row.fullName,
    width: '500px',
  },
  {
    id: 'birthDate',
    isSortable: true,
    label: t('shared.birth_date'),
    value: (row): string => {
      return DateUtil.toLocaleDate(row.birthDate)
    },
    width: '500px',
  },
])
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
    :is-top-hidden="true"
    :filters="[]"
    :pin-first-column="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
    :title="t('shared.users')"
  />
</template>
