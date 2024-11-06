<script  lang="ts" setup="">
import { usePagination } from '@wisemen/vue-core'

import { useUserIndexQuery } from '@/api/queries/userIndex.query.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'
import SettingsUsersOverviewTable from '@/modules/settings/features/users/components/SettingsUsersOverviewTable.vue'

const pagination = usePagination<UserIndexFilters>({
  isRouteQueryEnabled: true,
})
const userIndexQuery = useUserIndexQuery(pagination.paginationOptions)
</script>

<template>
  <div class="flex flex-1 flex-col pt-5">
    <SettingsUsersOverviewTable
      :is-loading="userIndexQuery.isLoading.value"
      :pagination="pagination"
      :data="userIndexQuery.data.value"
    />
  </div>
</template>
