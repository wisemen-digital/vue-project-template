<script setup lang="ts">
import {
  usePagination,
  VcSelect,
  VcSelectItem,
  VcSwitch,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import { QueueName } from '@/client'
import { useSettingsJobsIndexQuery } from '@/modules/settings/api/queries/settingsJobsIndex.query.ts'
import SettingsDialogContainer from '@/modules/settings/components/SettingsDialogContainer.vue'
import type { SettingsNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'
import SettingsJobsIndexTable from '@/modules/settings/features/jobs/components/SettingsJobIndexTable.vue'
import type { SettingsJobIndexPagination } from '@/modules/settings/models/jobs/settingsJobIndexPagination.model.ts'

const props = defineProps<{
  navigation: SettingsNavigation
}>()

const i18n = useI18n()

const pagination = usePagination<SettingsJobIndexPagination>({
  isRouteQueryEnabled: false,
  type: 'keyset',
})

const indexQuery = useSettingsJobsIndexQuery(pagination.paginationOptions)

async function onNext(): Promise<void> {
  await indexQuery.getNextPage()
}

function onUpdateFilter(value: QueueName[]): void {
  pagination.handleFilterChange({ queueNames: value })
}

function onUpdateIsArchivedFilter(value: boolean): void {
  pagination.handleFilterChange({ archived: value })
}
</script>

<template>
  <SettingsDialogContainer
    :navigation="props.navigation"
    :title="i18n.t('module.settings.jobs.title')"
  >
    <div class="p-sm px-lg gap-lg flex items-center justify-between">
      <VcSelect
        :model-value="pagination.paginationOptions.value.filter?.queueNames ?? []"
        :display-fn="(name) => name"
        :placeholder="i18n.t('module.settings.jobs.table.queue_name')"
        label=""
        class="w-50"
        @update:model-value="onUpdateFilter"
      >
        <VcSelectItem
          v-for="name of QueueName"
          :key="name"
          :value="name"
        >
          {{ name }}
        </VcSelectItem>
      </VcSelect>
      <VcSwitch
        :model-value="pagination.paginationOptions.value.filter?.archived ?? false"
        :label="i18n.t('module.settings.jobs.table.archived')"
        @update:model-value="onUpdateIsArchivedFilter"
      />
    </div>
    <SettingsJobsIndexTable
      :is-loading="indexQuery.isLoading.value"
      :pagination="pagination"
      :data="indexQuery.data.value"
      :on-next="onNext"
      :error="indexQuery.error.value"
      :is-fetching="indexQuery.isFetching.value"
    />
  </SettingsDialogContainer>
</template>
