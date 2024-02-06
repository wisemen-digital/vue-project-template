<script setup lang="ts" generic="TSchema, TFilters">
import { computed, ref } from 'vue'
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'

import AppTableBody from '@/components/app/table/AppTableBody.vue'
import AppTableFooter from '@/components/app/table/AppTableFooter.vue'
import AppTableHeader from '@/components/app/table/AppTableHeader.vue'
import AppTableTop from '@/components/app/table/AppTableTop.vue'
import type {
	FilterChangeEvent,
	PageChangeEvent,
	PaginationOptions,
	SortChangeEvent,
} from '@/composables/core/tablePagination.composable'
import type { TableColumn, TableFilter } from '@/types/core/table/table.model'

interface PaginatedData<TSchema> {
	data: TSchema[]
	total: number
}

type Props = {
	data: PaginatedData<TSchema>
	paginationOptions: PaginationOptions<TFilters>
	columns: TableColumn<TSchema>[]
	filters: TableFilter<TFilters>[]

	// Visual
	title: string
	isLoading?: boolean
	emptyMessage?: string
	pinFirstColumn?: boolean
	pinLastColumn?: boolean
}

type Emits = {
	filter: [event: FilterChangeEvent<TFilters>]
	sort: [event: SortChangeEvent]
	page: [event: PageChangeEvent]
}

const { data, paginationOptions, columns, pinFirstColumn, pinLastColumn } = defineProps<Props>()

const emit = defineEmits<Emits>()

const tableRef = ref<HTMLElement | null>(null)

// Because of how css works, we need to apply a different width (w-fit) when scrollable
const isHorizontallyScrollable = ref<boolean>(false)
const isScrolledToRight = ref<boolean>(false)
const hasReachedHorizontalScrollEnd = ref<boolean>(false)

let resizeObserver: ResizeObserver | null = null

const gridTemplateColumns = computed<string>(() => {
	return columns.reduce((acc, column) => {
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
			:title="title"
			:total="data.total"
		/>

		<div
			ref="tableRef"
			class="bg-bac flex h-full w-full flex-1 flex-col overflow-auto"
			@scroll="handleScroll"
		>
			<AppTableHeader
				:columns="columns"
				:grid-template-columns="gridTemplateColumns"
				:has-reached-horizontal-scroll-end="hasReachedHorizontalScrollEnd"
				:is-horizontally-scrollable="isHorizontallyScrollable"
				:is-scrolled-to-right="isScrolledToRight"
				:pagination-options="paginationOptions"
				:pin-first-column="pinFirstColumn"
				:pin-last-column="pinLastColumn"
				@sort="handleSortChange"
			/>

			<AppTableBody
				:columns="columns"
				:data="data.data"
				:empty-message="emptyMessage"
				:grid-template-columns="gridTemplateColumns"
				:has-reached-horizontal-scroll-end="hasReachedHorizontalScrollEnd"
				:is-horizontally-scrollable="isHorizontallyScrollable"
				:is-loading="isLoading"
				:is-scrolled-to-right="isScrolledToRight"
				:pin-first-column="pinFirstColumn"
				:pin-last-column="pinLastColumn"
			/>
		</div>

		<AppTableFooter
			:pagination-options="paginationOptions"
			:total="data.total"
			@page="handlePageChange"
		/>
	</div>
</template>
