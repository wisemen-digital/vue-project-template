<script setup lang="ts" generic="TSchema, TFilters">
import { computed, ref } from 'vue'
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'
import { watch } from 'vue'
import { nextTick } from 'vue'

import type {
	FilterChangeEvent,
	PageChangeEvent,
	PaginationOptions,
	SortChangeEvent,
} from '@/composables/table-pagination/tablePagination.composable'
import type { PaginatedData } from '@/types/pagination.type'
import type { TableColumn, TableFilter } from '@/types/table/table.type'

import AppTableBody from './AppTableBody.vue'
import AppTableFooter from './AppTableFooter.vue'
import AppTableHeader from './AppTableHeader.vue'
import AppTableTop from './AppTableTop.vue'

const props = withDefaults(
	defineProps<{
		data: PaginatedData<TSchema> | null
		paginationOptions: PaginationOptions<TFilters>
		columns: TableColumn<TSchema>[]
		filters: TableFilter<TFilters>[]

		isRowClickable?: boolean
		isLoading: boolean

		// Visual
		title: string
		emptyMessage: string
		pinFirstColumn?: boolean
		pinLastColumn?: boolean
	}>(),
	{
		isRowClickable: false,
		pinFirstColumn: false,
		pinLastColumn: false,
	}
)

const emit = defineEmits<{
	'filter': [event: FilterChangeEvent<TFilters>]
	'sort': [event: SortChangeEvent]
	'page': [event: PageChangeEvent]
	'row:click': [row: TSchema]
}>()

const tableRef = ref<HTMLElement | null>(null)

// Because of how css works, we need to apply a different width (w-fit) when scrollable
const isHorizontallyScrollable = ref<boolean>(false)
const isScrolledToRight = ref<boolean>(false)
const hasReachedHorizontalScrollEnd = ref<boolean>(false)

let resizeObserver: ResizeObserver | null = null

const gridTemplateColumns = computed<string>(() => {
	return props.columns.reduce((acc, column) => {
		const colSpan = column.size ?? '1fr'
		return `${acc} ${colSpan}`
	}, '')
})

function handleSortChange(sortChangeEvent: SortChangeEvent): void {
	emit('sort', sortChangeEvent)
}

// function handleFilterChange(filterId: keyof TFilters, value: unknown): void {
// 	const updatedFilters = {
// 		...paginationOptions.filters,
// 		[filterId]: value,
// 	} as FilterChangeEvent<TFilters>
//
// 	emit('filter', updatedFilters)
// }

function handlePageChange(event: PageChangeEvent): void {
	emit('page', event)
}

function handleRowClick(row: TSchema): void {
	emit('row:click', row)
}

function setIsHorizontallyScrollable(): void {
	if (tableRef.value === null) {
		return
	}

	const { scrollWidth, clientWidth } = tableRef.value

	isHorizontallyScrollable.value = scrollWidth > clientWidth
}

function setIsScrolledToRight(): void {
	if (tableRef.value === null) {
		return
	}

	const { scrollLeft } = tableRef.value

	isScrolledToRight.value = scrollLeft > 0
}

function setHasReachedHorizontalScrollEnd(): void {
	if (tableRef.value === null) {
		return
	}

	const { scrollWidth, clientWidth, scrollLeft } = tableRef.value

	hasReachedHorizontalScrollEnd.value = scrollWidth - clientWidth === scrollLeft
}

function createResizeObserver(element: HTMLElement, onResize: () => void): ResizeObserver {
	const observer = new ResizeObserver(onResize)
	observer.observe(element)

	return observer
}

function handleResize(): void {
	setIsHorizontallyScrollable()
}

function handleScroll(): void {
	setIsScrolledToRight()
	setHasReachedHorizontalScrollEnd()
}

async function onDataChange(): Promise<void> {
	await nextTick()
	setIsHorizontallyScrollable()
}

watch(() => props.data, onDataChange)

onMounted(() => {
	if (tableRef.value === null) {
		throw new Error('Table ref is null')
	}

	resizeObserver = createResizeObserver(tableRef.value, handleResize)
	setIsHorizontallyScrollable()
})

onBeforeUnmount(() => {
	resizeObserver?.unobserve(tableRef.value as Element)
})
</script>

<template>
	<div class="flex h-full flex-1 flex-col overflow-hidden rounded-xl border border-solid border-border">
		<AppTableTop
			:title="props.title"
			:total="props.data?.total ?? 0"
		/>

		<div
			ref="tableRef"
			class="bg-bac flex h-full w-full flex-1 flex-col overflow-auto"
			@scroll="handleScroll"
		>
			<AppTableHeader
				v-if="!props.isLoading"
				:columns="props.columns"
				:grid-template-columns="gridTemplateColumns"
				:has-reached-horizontal-scroll-end="hasReachedHorizontalScrollEnd"
				:is-horizontally-scrollable="isHorizontallyScrollable"
				:is-scrolled-to-right="isScrolledToRight"
				:pagination-options="props.paginationOptions"
				:pin-first-column="props.pinFirstColumn"
				:pin-last-column="props.pinLastColumn"
				@sort="handleSortChange"
			/>

			<AppTableBody
				:columns="props.columns"
				:data="props.data?.data ?? []"
				:empty-message="props.emptyMessage"
				:grid-template-columns="gridTemplateColumns"
				:has-reached-horizontal-scroll-end="hasReachedHorizontalScrollEnd"
				:is-horizontally-scrollable="isHorizontallyScrollable"
				:is-loading="props.isLoading"
				:is-row-clickable="props.isRowClickable"
				:is-scrolled-to-right="isScrolledToRight"
				:pin-first-column="props.pinFirstColumn"
				:pin-last-column="props.pinLastColumn"
				@row:click="handleRowClick"
			/>
		</div>

		<AppTableFooter
			:pagination-options="props.paginationOptions"
			:total="props.data?.total ?? 0"
			@page="handlePageChange"
		/>
	</div>
</template>
