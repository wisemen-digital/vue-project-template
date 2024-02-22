<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppTablePage from '@/components/app/AppTablePage.vue'
import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import { useTablePagination } from '@/composables/table-pagination/tablePagination.composable'
import type { UserUuid } from '@/models/users/userUuid.model'
import { useGetIndexUsersQuery } from '@/modules/users/api/queries/usersIndex.query'

import UsersOverviewHeaderActions from '../components/UsersOverviewHeaderActions.vue'
import UsersOverviewTable from '../components/UsersOverviewTable.vue'

const { t } = useI18n()
const router = useTypedRouter()

const paginationOptions = useTablePagination<[]>({
	id: 'users',
})

const { data: paginatedUsers, isLoading: isLoadingUsers } = useGetIndexUsersQuery(paginationOptions.paginationOptions)

function onNavigateToUserDetail(userUuid: UserUuid): void {
	router.push({
		name: 'users-detail',
		params: {
			userUuid,
		},
	})
}
</script>

<template>
	<AppTablePage :title="t('shared.users')">
		<template #header-actions>
			<UsersOverviewHeaderActions />
		</template>

		<UsersOverviewTable
			:data="paginatedUsers"
			:is-loading="isLoadingUsers"
			:pagination="paginationOptions"
			@navigate-to-user-detail="onNavigateToUserDetail"
		/>
	</AppTablePage>
</template>
