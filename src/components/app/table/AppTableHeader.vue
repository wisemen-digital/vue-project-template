<script setup lang="ts" generic="TSchema">
import { computed } from 'vue'

import AppText from '@/components/core/AppText.vue'
import type { PaginationOptions, SortChangeEvent, SortDirection } from '@/composables/core/tablePagination.composable'
import type { Icon } from '@/icons/icon.type'
import type { TableColumn } from '@/models/table/table.model'
import AppIcon from '@/ui/components/icon/AppIcon.vue'

type Props = {
	gridTemplateColumns: string
	paginationOptions: PaginationOptions<unknown>
	columns: TableColumn<TSchema>[]
	pinFirstColumn: boolean
	pinLastColumn: boolean
	isHorizontallyScrollable: boolean
	isScrolledToRight: boolean
	hasReachedHorizontalScrollEnd: boolean
}

type Emits = {
	sort: [event: SortChangeEvent]
}

const {
	gridTemplateColumns,
	paginationOptions,
	columns,
	pinFirstColumn,
	pinLastColumn,
	isHorizontallyScrollable,
	isScrolledToRight,
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const currentSortDirection = computed<SortDirection>(() => {
	const { sort } = paginationOptions
	const columnId = Object.keys(sort ?? {})[0]

	return getCurrentSortDirection(sort ?? null, columnId)
})

function getCurrentSortDirection(sort: SortChangeEvent | null, columnId: string): SortDirection {
	return sort?.[columnId] ?? 'asc'
}

function toggleSortDirection(direction: SortDirection): SortDirection {
	return direction === 'asc' ? 'desc' : 'asc'
}

function isColumnSorted(columnId: string): boolean {
	const { sort } = paginationOptions
	const isSameColumn = Object.keys(sort ?? {})[0] === columnId

	return isSameColumn
}

function handleSortChange(columnId: string): void {
	const { sort } = paginationOptions
	const isSameColumn = isColumnSorted(columnId)

	let direction = getCurrentSortDirection(sort ?? null, columnId)

	if (shouldRemoveSort(isSameColumn, direction)) {
		removeSort()
		return
	}

	if (isSameColumn) {
		direction = toggleSortDirection(direction)
	} else {
		direction = 'asc'
	}

	updateSort(columnId, direction)
}

function shouldRemoveSort(isSameColumn: boolean, direction: 'asc' | 'desc'): boolean {
	return isSameColumn && direction === 'desc'
}

function removeSort(): void {
	const updatedSort = {} as SortChangeEvent
	emit('sort', updatedSort)
}

function updateSort(columnId: string, direction: 'asc' | 'desc'): void {
	const updatedSort = {
		[columnId]: direction,
	} as SortChangeEvent

	emit('sort', updatedSort)
}

function getComponent(isSortable: boolean): string {
	return isSortable ? 'button' : 'AppText'
}

function handleSortColumnButtonClick(column: TableColumn<TSchema>): void {
	const isSortable = column.isSortable ?? false

	if (!isSortable) {
		return
	}

	handleSortChange(column.id)
}

function getColumnIcon(columnId: string): Icon {
	const isColumnCurrentlySorted = isColumnSorted(columnId)

	if (isColumnCurrentlySorted && currentSortDirection.value === 'asc') {
		return 'arrowUp'
	}

	if (isColumnCurrentlySorted && currentSortDirection.value === 'desc') {
		return 'arrowDown'
	}

	return 'arrowUpArrowDown'
}
</script>

<template>
	<div
		class="sticky top-0 z-20 grid border-y border-solid border-border bg-muted-background"
		:class="[isHorizontallyScrollable ? 'w-fit' : 'w-full']"
		:style="{
			gridTemplateColumns,
		}"
	>
		<Component
			:is="getComponent(column.isSortable ?? false)"
			v-for="column in columns"
			:key="column.id"
			class="group flex items-center gap-x-2 rounded-none px-6 py-3 outline-none focus-visible:bg-neutral-100"
			:class="[
				isScrolledToRight ? 'first:border-r-border' : 'first:border-r-transparent',
				hasReachedHorizontalScrollEnd ? 'last:border-l-transparent' : 'last:border-l-border',
				{
					'left-0 bg-muted-background first:sticky first:z-10 first:border-r first:border-solid': pinFirstColumn,
				},
				{
					'right-0 bg-muted-background last:sticky last:z-10 last:border-l last:border-solid':
						pinLastColumn && isHorizontallyScrollable,
				},
			]"
			@click="handleSortColumnButtonClick(column)"
		>
			<AppText
				class="truncate"
				variant="subtext"
			>
				{{ column.label }}
			</AppText>

			<AppIcon
				v-if="column.isSortable ?? false"
				class="h-3 w-3 duration-200"
				:class="[
					isColumnSorted(column.id)
						? 'text-muted-foreground'
						: 'text-muted-foreground/25 group-hover:text-muted-foreground/50 group-focus-visible:text-muted-foreground/50',
				]"
				:icon="getColumnIcon(column.id)"
			/>
		</Component>
	</div>
</template>
