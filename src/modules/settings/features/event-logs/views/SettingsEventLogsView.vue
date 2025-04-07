<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import { useSettingEventLogIndexQuery } from '@/modules/settings/api/queries/settingsEventLogIndex.query.ts'
import SettingsDialogContainer from '@/modules/settings/components/SettingsDialogContainer.vue'
import type { SettingNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'
import SettingsEventLogIndexTable from '@/modules/settings/features/event-logs/components/SettingsEventLogIndexTable.vue'
import type { SettingLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'

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
  <SettingsDialogContainer
    :navigation="props.navigation"
    :title="i18n.t('module.settings.event_logs.title')"
  >
    <SettingsEventLogIndexTable
      :is-loading="indexQuery.isLoading.value"
      :pagination="pagination"
      :data="indexQuery.data.value"
      :on-next="onNext"
      :error="indexQuery.error.value"
      :is-fetching="indexQuery.isFetching.value"
    />
  </SettingsDialogContainer>
</template>
