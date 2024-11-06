<script  lang="ts" setup="">
import {
  AppTable,
  type PaginatedData,
  type Pagination,
  type TableColumn,
} from '@wisemen/vue-core'
import {
  computed,
  h,
  type VNode,
} from 'vue'

import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'

const props = defineProps<{
  isLoading: boolean
  data: PaginatedData<UserIndex> | null
  pagination: Pagination<UserIndexFilters>
}>()

const i18n = useI18n()

const columns = computed<TableColumn<UserIndex>[]>(() => ([
  {
    cell: (user): VNode => h('div', user.fullName),
    headerLabel: i18n.t('user.name'),
    key: 'name',
  },
]))
</script>

<template>
  <AppTable
    :columns="columns"
    :data="props.data"
    :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.CONTAINER"
    :is-first-column-sticky="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
    title="te"
  />
</template>
