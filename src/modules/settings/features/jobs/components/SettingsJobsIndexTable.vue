<script setup lang="ts">
import type {
  PaginatedData,
  Pagination,
  TableColumn,
} from '@wisemen/vue-core-components'
import { VcTable } from '@wisemen/vue-core-components'
import type { VNode } from 'vue'
import {
  computed,
  h,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppTableTextCell from '@/components/app/table/AppTableTextCell.vue'
import type { SettingsJobsIndex } from '@/modules/settings/models/jobs/settingsJobsIndexDto.model.ts'
import type { SettingsJobsIndexPagination } from '@/modules/settings/models/jobs/settingsJobsIndexPagination.model.ts'

const props = defineProps<{
  isFetching: boolean
  isLoading: boolean
  data: PaginatedData<SettingsJobsIndex> | null
  error: unknown | null
  pagination: Pagination<SettingsJobsIndexPagination>
  onNext: () => Promise<void>
}>()

const i18n = useI18n()

const columns = computed<TableColumn<SettingsJobsIndex>[]>(() => [
  {
    cell: (eventLog): VNode => h(AppTableTextCell, { value: eventLog.jobName }),
    headerLabel: i18n.t('shared.type'),
    key: 'type',
    width: '20rem',
  },

])
</script>

<template>
  <AppErrorState
    v-if="props.error !== null"
    :error="props.error"
  />
  <VcTable
    v-else
    :columns="columns"
    :data="props.data"
    :class-config="{
      row: 'border-0 hover:bg-secondary',
      headerCell: 'bg-primary',
      root: 'border-0',
      cell: 'group-hover/row:bg-secondary',
    }"
    :row-class="() => '!border-b-secondary'"
    :is-first-column-sticky="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
    @next="props.onNext()"
  />
</template>
