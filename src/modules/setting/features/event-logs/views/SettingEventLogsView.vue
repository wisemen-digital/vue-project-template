<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import { useSettingEventLogIndexQuery } from '@/modules/setting/api/queries/settingEventLogIndex.query.ts'
import SettingContainer from '@/modules/setting/components/SettingContainer.vue'
import type { SettingNavigation } from '@/modules/setting/composables/settingNavigation.composable.ts'
import SettingEventLogIndexTable from '@/modules/setting/features/event-logs/components/SettingEventLogIndexTable.vue'
import type { SettingLogIndexPagination } from '@/modules/setting/models/event-log/settingEventLogIndexPagination.model.ts'

const props = defineProps<{
  navigation: SettingNavigation
}>()

const i18n = useI18n()

const pagination = usePagination<SettingLogIndexPagination>({
  isRouteQueryEnabled: false,
  type: 'keyset',
})

const indexQuery = useSettingEventLogIndexQuery(pagination.paginationOptions)

async function onNext(): Promise<void> {
  await indexQuery.getNextPage()
}
</script>

<template>
  <SettingContainer
    :navigation="props.navigation"
    :title="i18n.t('module.setting.event_logs.title')"
  >
    <SettingEventLogIndexTable
      :is-loading="indexQuery.isLoading.value"
      :pagination="pagination"
      :data="indexQuery.data.value"
      :on-next="onNext"
      :error="indexQuery.error.value"
      :is-fetching="indexQuery.isFetching.value"
    />
  </SettingContainer>
</template>
