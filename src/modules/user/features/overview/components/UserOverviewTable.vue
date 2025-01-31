<script setup lang="ts">
import type {
  PaginatedData,
  Pagination,
  TableColumn,
} from '@wisemen/vue-core'
import { VcTable, VcTableCell } from '@wisemen/vue-core'
import {
  computed,
  h,
  type VNode,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'
import UserOverviewTableNameCell from '@/modules/user/features/overview/components/UserOverviewTableNameCell.vue'
import { DateFormatUtil } from '@/utils/date.util.ts'

const props = defineProps<{
  isLoading: boolean
  data: PaginatedData<UserIndex> | null
  error: unknown | null
  pagination: Pagination<UserIndexFilters>
}>()

const { t } = useI18n()

const columns = computed<TableColumn<UserIndex>[]>(() => [
  {
    testId: TEST_ID.USERS.OVERVIEW.TABLE.FULL_NAME,
    isSortable: true,
    cell: (user): VNode => h(UserOverviewTableNameCell, { user }),
    headerLabel: t('user.name'),
    key: 'name',
  },
  {
    testId: TEST_ID.USERS.OVERVIEW.TABLE.BIRTH_DATE,
    isSortable: true,
    cell: (): VNode => h(VcTableCell, () => DateFormatUtil.toNumericDate(new Date())),
    headerLabel: t('user.birth_date'),
    key: 'birthDate',
  },
])
</script>

<template>
  <div
    v-if="props.error !== null"
    class="flex size-full flex-1 items-center justify-center"
  >
    <AppErrorState :error="null" />
  </div>

  <VcTable
    v-else
    :columns="columns"
    :data="props.data"
    :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.CONTAINER"
    :is-first-column-sticky="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
  />
</template>
