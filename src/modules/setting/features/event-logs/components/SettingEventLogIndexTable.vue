<script setup lang="ts">
import type {
  PaginatedData,
  Pagination,
  TableColumn,
} from '@wisemen/vue-core'
import { VcTable } from '@wisemen/vue-core'
import type { VNode } from 'vue'
import {
  computed,
  h,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppTableTextCell from '@/components/app/table/AppTableTextCell.vue'
import { useLocalizedDateFormat } from '@/composables/localized-date-format/localizedDateFormat.composable.ts'
import SettingEventLogIndexTableContentCell from '@/modules/setting/features/event-logs/components/SettingEventLogIndexTableContentCell.vue'
import type { SettingLogIndex } from '@/modules/setting/models/event-log/settingEventLogIndex.model.ts'
import type { SettingLogIndexPagination } from '@/modules/setting/models/event-log/settingEventLogIndexPagination.model.ts'

const props = defineProps<{
  isFetching: boolean
  isLoading: boolean
  data: PaginatedData<SettingLogIndex> | null
  error: unknown | null
  pagination: Pagination<SettingLogIndexPagination>
  onNext: () => Promise<void>
}>()

const i18n = useI18n()

const dateFormatter = useLocalizedDateFormat()

const columns = computed<TableColumn<SettingLogIndex>[]>(() => [
  {
    cell: (eventLog): VNode => h(AppTableTextCell, { value: eventLog.type }),
    headerLabel: i18n.t('shared.type'),
    key: 'type',
    width: '20rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, { value: dateFormatter.toDateTime(eventLog.createdAt) }),
    headerLabel: i18n.t('shared.created_at'),
    key: 'createdAt',
    width: '12rem',
  },
  {
    cell: (eventLog): VNode => h(AppTableTextCell, { value: eventLog.uuid }),
    headerLabel: i18n.t('shared.id'),
    key: 'uuid',
    width: '24rem',
  },
  {
    cell: (eventLog): VNode => h(SettingEventLogIndexTableContentCell, { content: eventLog.content }),
    headerLabel: i18n.t('shared.info'),
    key: 'content',
    width: '5rem',
  },
])

async function onNext(): Promise<void> {
  await props.onNext()
}
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
    :infinite-scroll="{
      onNext,
      distance: 300,
    }"
    :row-class="() => '!border-b-secondary'"
    :is-last-column-sticky="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
    variant="borderless"
  />
</template>
