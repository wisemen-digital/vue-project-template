<script setup lang="ts" generic="TSchema, TFilters">
import { computed } from 'vue'

import type {
	FilterChangeEvent,
	PageChangeEvent,
	PaginationOptions,
	SortChangeEvent,
	SortDirection,
} from '@/composables/core/tablePagination.composable'
import type { TableColumn, TableFilter } from '@/models/table/table.model'
import AppButton from '@/ui/components/button/AppButton.vue'
import AppInput from '@/ui/components/input/AppInput.vue'
import { toComputedRefs } from '@/utils/toComputedRefs.util'

type Props = {
	data: TSchema[]
	paginationOptions: PaginationOptions<TFilters>
	columns: TableColumn<TSchema>[]
	filters: TableFilter<TFilters>[]
}

type Emits = {
	filter: [event: FilterChangeEvent<TFilters>]
	sort: [event: SortChangeEvent]
	page: [event: PageChangeEvent]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const { data, paginationOptions, columns, filters } = toComputedRefs(props)

const gridTemplateColumns = computed<string>(() => {
	return columns.value.reduce((acc, column) => {
		const colSpan = column.size ?? '1fr'
		return `${acc} ${colSpan}`
	}, '')
})

const currentPageIndex = computed<number>(() => {
	return paginationOptions.value.pagination?.page ?? 1
})

function getCurrentSortDirection(sort: SortChangeEvent | null, columnId: string): SortDirection {
	return sort?.[columnId] ?? 'asc'
}

function toggleSortDirection(direction: SortDirection): SortDirection {
	return direction === 'asc' ? 'desc' : 'asc'
}

function handleSortChange(columnId: string): void {
	const { sort } = paginationOptions.value
	const isSameColumn = Object.keys(sort ?? {})[0] === columnId

	let direction = getCurrentSortDirection(sort ?? null, columnId)

	if (isSameColumn) {
		direction = toggleSortDirection(direction)
	} else {
		direction = 'asc'
	}

	const updatedSort = {
		[columnId]: direction,
	} as SortChangeEvent

	emit('sort', updatedSort)
}

function handleFilterChange(filterId: keyof TFilters, value: unknown): void {
	const updatedFilters = {
		...paginationOptions.value.filters,
		[filterId]: value,
	} as FilterChangeEvent<TFilters>

	emit('filter', updatedFilters)
}

function handlePageChange(event: PageChangeEvent): void {
	emit('page', event)
}

function getFilterValueById(id: keyof TFilters): unknown {
	const value = paginationOptions.value.filters?.[id] ?? null
	return value
}

function setPage(page: number): void {
	const updatedPaginationOptions = {
		...paginationOptions.value.pagination,
		page,
	} as PageChangeEvent

	handlePageChange(updatedPaginationOptions)
}

function getPagination(): NonNullable<PaginationOptions<TFilters>['pagination']> {
	const pagination = paginationOptions.value.pagination ?? null

	if (pagination === null) {
		throw new Error('Pagination is not defined')
	}

	return pagination
}

function handlePrevPage(): void {
	const { page } = getPagination()

	if (page === 1) {
		return
	}

	setPage(page - 1)
}

function getTotalPages(data: unknown[], perPage: number): number {
	return Math.ceil(data.length / perPage)
}

function handleNextPage(): void {
	const { page, perPage } = getPagination()

	const totalPages = getTotalPages(data.value, perPage)

	if (page === totalPages) {
		return
	}

	setPage(page + 1)
}

function handlePrevPageButtonClick(): void {
	handlePrevPage()
}

function handleNextPageButtonClick(): void {
	handleNextPage()
}
</script>

<template>
	<div>
		<!-- Filters -->
		{{ paginationOptions }}
		<div
			v-for="filter in filters"
			:key="filter.label"
		>
			<div v-if="filter.type === 'text'">
				<!-- @vue-expect-error -->
				<AppInput
					:model-value="getFilterValueById(filter.id)"
					@update:model-value="(value: string) => handleFilterChange(filter.id, value)"
				/>
			</div>
		</div>

		<!-- header -->
		<div
			class="grid"
			:style="{
				gridTemplateColumns,
			}"
		>
			<div
				v-for="column in columns"
				:key="column.id"
			>
				<div
					v-if="column.isSortable"
					@click="handleSortChange(column.id)"
				>
					{{ column.name }}
				</div>

				<div v-else>
					{{ column.name }}
				</div>
			</div>
		</div>

		<div
			v-for="(row, index) in data"
			:key="index"
			class="grid"
			:style="{
				gridTemplateColumns,
			}"
		>
			<div
				v-for="column in columns"
				:key="column.id"
			>
				<Component :is="column.render(row)" />
			</div>
		</div>

		<AppButton @click="handlePrevPageButtonClick">Prev</AppButton>
		{{ currentPageIndex }}
		<AppButton @click="handleNextPageButtonClick">Next</AppButton>
	</div>
</template>
