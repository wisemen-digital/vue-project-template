<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDisplayData from '@/components/app/AppDisplayData.vue'
import AppTable from '@/components/app/table/AppTable.vue'
import { useTablePagination } from '@/composables/core/table-pagination/tablePagination.composable'
import type { ClientUuid } from '@/models/clients/client.model.ts'
import type { ClientIndex } from '@/models/clients/clientIndex.model.ts'
import type { TableColumn } from '@/models/core/table/table.model'
import { generateUuid } from '@/utils/core/uuid/generateUuid.util.ts'
import { createComponent } from '@/utils/createComponent.util.ts'

interface UserTableFilters {
	uuid?: string
	name?: string
}

const { t } = useI18n()

const { paginationOptions, handleFilterChange, handlePageChange, handleSortChange } =
	useTablePagination<UserTableFilters>({
		id: 'clients',
		defaultPaginationOptions: {
			pagination: {
				perPage: 10,
				page: 1,
			},
		},
	})

const data: ClientIndex[] = [
	{
		uuid: generateUuid<ClientUuid>(),
		companyEmail: 'example@email.com',
		companyCity: 'Amsterdam',
		companyName: 'Studaro',
		contactPersonName: 'John Doe',
		contactPersonRole: 'CEO',
		salesConsultant: 'Jane Doe',
		website: 'www.studaro.com',
	},
]

const paginatedData = computed<{
	data: ClientIndex[]
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

const columns: TableColumn<ClientIndex>[] = [
	{
		id: 'company',
		label: t('shared.company'),
		size: '200px',
		isSortable: true,
		render: (row) =>
			createComponent(AppDisplayData, {
				value: row.companyName,
				label: row.companyCity,
			}),
	},
	{
		id: 'contactPerson',
		label: t('shared.contact_person'),
		size: '200px',
		isSortable: true,
		render: (row) =>
			createComponent(AppDisplayData, {
				value: row.contactPersonName,
				label: row.contactPersonRole,
			}),
	},
	{
		id: 'salesConsultant',
		label: t('shared.sales_consultant'),
		size: '200px',
		isSortable: false,
		value: (row) => row.salesConsultant,
	},
	{
		id: 'email',
		label: t('shared.email'),
		size: '200px',
		isSortable: false,
		value: (row) => row.companyEmail,
	},
	{
		id: 'website`',
		label: t('shared.website'),
		size: '200px',
		isSortable: false,
		value: (row) => row.website,
	},
]
</script>

<template>
	<AppTable
		:columns="columns"
		:data="paginatedData"
		:empty-message="t('clients.not_found')"
		:filters="[]"
		:is-loading="false"
		:pagination-options="paginationOptions"
		:pin-first-column="true"
		:pin-last-column="false"
		:title="t('shared.clients')"
		@filter="handleFilterChange"
		@page="handlePageChange"
		@sort="handleSortChange"
	/>
</template>
