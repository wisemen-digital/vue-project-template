<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import { useSettingsJobsIndexQuery } from '@/modules/settings/api/queries/settingsJobsIndex.query.ts'
import SettingsDialogContainer from '@/modules/settings/components/SettingsDialogContainer.vue'
import type { SettingsNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'
import SettingsJobsIndexTable from '@/modules/settings/features/jobs/components/SettingsJobsIndexTable.vue'
import type { SettingsJobsIndexPagination } from '@/modules/settings/models/jobs/settingsJobsIndexPagination.model.ts'

const props = defineProps<{
  navigation: SettingsNavigation
}>()

const i18n = useI18n()

const pagination = usePagination<SettingsJobsIndexPagination>({
  isRouteQueryEnabled: false,
  type: 'keyset',
})

const indexQuery = useSettingsJobsIndexQuery(pagination.paginationOptions)

async function onNext(): Promise<void> {
  await indexQuery.getNextPage()
}
</script>

<template>
  <SettingsDialogContainer
    :navigation="props.navigation"
    :title="i18n.t('module.settings.jobs.title')"
  >
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
