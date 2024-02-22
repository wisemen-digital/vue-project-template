<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppTable from '@/components/app/table/AppTable.vue'
import type { UserIndex } from '@/models/users/index/userIndex.model'
import type { UserUuid } from '@/models/users/userUuid.model'
import type { PaginatedData } from '@/types/pagination.type'
import type { Pagination, TableColumn } from '@/types/table/table.type'

const props = defineProps<{
	data: PaginatedData<UserIndex> | null
	pagination: Pagination<[]>
	isLoading: boolean
}>()

const emit = defineEmits<{
	navigateToUserDetail: [userUuid: UserUuid]
}>()

const { t } = useI18n()

const columns: TableColumn<UserIndex>[] = [
	{
		id: 'name',
		size: '1fr',
		label: t('shared.name'),
		value: (row: UserIndex) => row.fullName,
	},
]

function onRowClick(user: UserIndex): void {
	emit('navigateToUserDetail', user.uuid)
}
</script>

<template>
	<AppTable
		:columns="columns"
		:data="props.data"
		:empty-message="t('users.overview.empty')"
		:filters="[]"
		:is-loading="props.isLoading"
		:is-row-clickable="true"
		:pagination-options="props.pagination.paginationOptions.value"
		:title="t('shared.users')"
		@filter="props.pagination.handleFilterChange"
		@page="props.pagination.handlePageChange"
		@row:click="onRowClick"
		@sort="props.pagination.handleSortChange"
	/>
</template>
