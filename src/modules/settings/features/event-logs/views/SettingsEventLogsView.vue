<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import { useSettingsEventLogIndexQuery } from '@/modules/settings/api/queries/settingsEventLogIndex.query.ts'
import SettingsDialogContainer from '@/modules/settings/components/SettingsDialogContainer.vue'
import type { SettingsNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'
import SettingsEventLogIndexTable from '@/modules/settings/features/event-logs/components/SettingsEventLogIndexTable.vue'
import type { SettingsEventLogIndexPagination } from '@/modules/settings/models/event-log/settingsEventLogIndexPagination.model.ts'

const props = defineProps<{
  navigation: SettingsNavigation
}>()

const i18n = useI18n()

const pagination = usePagination<SettingsEventLogIndexPagination>({
  isRouteQueryEnabled: false,
  type: 'keyset',
})

const indexQuery = useSettingsEventLogIndexQuery(pagination.paginationOptions)

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
