<script setup lang="ts">
import { computed } from 'vue'

import AppTableTags from '@/AppTableTags.vue'
import type { TableColumn, TableFilter } from '@/types/core/table/table.model'

import AppTable from './components/app/table/AppTable.vue'
import { useTablePagination } from './composables/core/tablePagination.composable'
import { createComponent } from './utils/createComponent.util'

interface UserTableFilters {
	uuid?: string
	name?: string
}

interface User {
	uuid: string
	name: string
	age: number
	role: string
	tags: string[]
}

const { paginationOptions, handleFilterChange, handlePageChange, handleSortChange } =
	useTablePagination<UserTableFilters>({
		id: 'users',
		defaultPaginationOptions: {
			pagination: {
				perPage: 10,
				page: 1,
			},
		},
	})

const data: User[] = [
	{ uuid: '1', name: 'John Doe', age: 32, role: 'admin', tags: ['User', 'Example'] },
	{ uuid: '2', name: 'Jane Something', age: 45, role: 'user', tags: ['Something'] },
	{ uuid: '3', name: 'Leander Nelissen', age: 21, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '4', name: 'Kiryl Maltsav', age: 28, role: 'user', tags: ['Tag 1', 'Tag 4'] },
	{ uuid: '5', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '6', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '7', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '8', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2', 'Tag 3'] },
	{ uuid: '9', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '10', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '11', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '12', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '13', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '14', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2', 'Tag 3'] },
	{ uuid: '15', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '16', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '17', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '18', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '19', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '20', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2', 'Tag 3'] },
	{ uuid: '21', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '22', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '23', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '24', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '25', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '26', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2', 'Tag 3'] },
	{ uuid: '27', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '28', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '29', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '30', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '31', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '32', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2', 'Tag 3'] },
	{ uuid: '33', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '34', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '35', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '36', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '37', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '38', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2'] },
	{ uuid: '39', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '40', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '41', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '42', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '43', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '44', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2', 'Tag 3'] },
	{ uuid: '45', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '46', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '47', name: 'Jeroen Vankakenberg', age: 36, role: 'admin', tags: ['Tag 3'] },
	{ uuid: '48', name: 'Jonas Nieuwhuis', age: 50, role: 'user', tags: ['User', 'Example'] },
	{ uuid: '49', name: 'Maarten Sijmkens', age: 22, role: 'admin', tags: ['Subscriber', 'Donator'] },
	{ uuid: '50', name: 'Samuel De Ridder', age: 42, role: 'user', tags: ['Tag 2', 'Tag 3'] },
	{ uuid: '51', name: 'Stephen Coenen', age: 29, role: 'admin', tags: ['Tag 4'] },
	{ uuid: '52', name: 'Niels Lemmens', age: 31, role: 'user', tags: ['User', 'Example'] },
]

const paginatedData = computed<{
	data: User[]
	total: number
}>(() => {
	const { page, perPage } = paginationOptions.value.pagination ?? {}

	const start = (page - 1) * perPage
	const end = start + perPage

	return {
		data: data.slice(start, end),
		total: data.length,
	}
})

const columns: TableColumn<User>[] = [
	{
		id: 'uuid',
		label: 'ID',
		size: '80px',
		value: (row) => row.uuid,
	},
	{
		id: 'name',
		label: 'Name',
		size: '200px',
		isSortable: true,
		value: (row) => row.name,
	},
	{
		id: 'age',
		label: 'Age',
		size: '200px',
		isSortable: true,
		value: (row) => `${row.age} years old`,
	},
	{
		id: 'tags',
		label: 'Tags',
		size: '800px',
		isSortable: false,
		render: (row) =>
			createComponent(AppTableTags, {
				tags: row.tags,
			}),
	},
	{
		id: 'actions',
		label: '',
		size: '150px',
		value: () => 'Actions',
	},
]

const filters: TableFilter<UserTableFilters>[] = [
	{
		id: 'name',
		type: 'text',
		label: 'Name',
	},
	{
		id: 'uuid',
		type: 'text',
		label: 'UUID',
	},
]
</script>

<template>
	<AppTable
		:columns="columns"
		:data="paginatedData"
		:filters="filters"
		:pagination-options="paginationOptions"
		:pin-first-column="true"
		:pin-last-column="true"
		title="Gebruikers"
		@filter="handleFilterChange"
		@page="handlePageChange"
		@sort="handleSortChange"
	/>
</template>
