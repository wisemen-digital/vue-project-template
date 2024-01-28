<script setup lang="ts">
import { h } from 'vue'

import AppTable from './components/app/AppTable.vue'
import { useDocumentTitle } from './composables/core/documentTitle.composable'
import { useTablePagination } from './composables/core/tablePagination.composable'
import type { TableColumn, TableFilter } from './models/table/table.model'

const { setTemplate } = useDocumentTitle()

setTemplate('{title} | App')

interface UserTableFilters {
	name?: string
}

interface User {
	uuid: string
	name: string
}

const { paginationOptions, handleFilterChange, handlePageChange, handleSortChange, setPagination } =
	useTablePagination<UserTableFilters>({
		id: 'users',
		defaultPaginationOptions: {
			filters: {
				name: 'defaultValue',
			},
		},
	})

const data: User[] = [
	...Array.from({ length: 100 }, (_, i) => ({
		uuid: `uuid-${i}`,
		name: `User ${i}`,
	})),
]

setPagination({
	page: 1,
	perPage: 10,
	total: data.length,
})

const columns: TableColumn<User>[] = [
	{
		id: 'uuid',
		name: 'UUID',
		size: '1fr',
		isSortable: true,
		render: (row) => h('div', row.uuid),
	},
	{
		id: 'name',
		name: 'Name',
		size: '1fr',
		isSortable: true,
		render: (row) => h('div', row.name),
	},
]

const filters: TableFilter<UserTableFilters>[] = [
	{
		id: 'name',
		type: 'text',
		label: 'Name',
	},
]
</script>

<template>
	<div class="p-24">
		<AppTable
			:columns="columns"
			:data="data"
			:filters="filters"
			:pagination-options="paginationOptions"
			@filter="handleFilterChange"
			@page="handlePageChange"
			@sort="handleSortChange"
		/>
	</div>
</template>
