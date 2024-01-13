import type { RendererElement, RendererNode, VNode } from 'vue'

interface TableColumn<T> {
	key: string
	name: string
	isSortable?: boolean
	size?: string
	component: (data: T) => VNode<RendererNode, RendererElement, { [key: string]: any }>
}

interface SortState {
	column: string
	direction: 'asc' | 'desc'
}

interface UseTableOptions<T extends any[]> {
	data: ComputedRef<T> | Ref<T>
	columns: TableColumn<T[number]>[]
	rowComponent?: (data: T[number]) => VNode
	onSort?: (key: string, direction: 'asc' | 'desc') => void
}

interface UseTableReturnType {
	table: ComputedRef<VNode>
}

export function useTable<T extends any[]>({
	data,
	columns,
	rowComponent,
	onSort,
}: UseTableOptions<T>): UseTableReturnType {
	const sortState = ref<SortState>({
		column: '',
		direction: 'asc',
	})

	const handleSort = (column: TableColumn<unknown>): void => {
		if (!column.isSortable) {
			return
		}

		if (sortState.value.column === column.key) {
			sortState.value.direction = sortState.value.direction === 'asc' ? 'desc' : 'asc'
		} else {
			sortState.value.direction = 'asc'
		}

		sortState.value.column = column.key

		onSort?.(column.key, sortState.value.direction)
	}

	const gridTemplateColumns = computed<string>(() => {
		const gridCols = columns.reduce((acc, column) => {
			const colSpan = column.size ?? '1fr'
			return `${acc} ${colSpan}`
		}, '')

		return gridCols
	})

	const tableComponent = computed<VNode>(() =>
		h('div', [
			// head
			h('div', [
				// tr
				h(
					'div',
					{
						class: 'grid',
						style: {
							gridTemplateColumns: gridTemplateColumns.value,
						},
					},
					[
						columns.map((column) =>
							// th
							h(
								'div',
								{
									onClick: () => handleSort(column),
								},
								column.name
							)
						),
					]
				),
			]),
			// body
			h('div', [
				data.value.map((row) =>
					h(
						// tr
						rowComponent?.(row) ?? 'div',
						{
							class: 'grid',
							style: {
								gridTemplateColumns: gridTemplateColumns.value,
							},
						},
						columns.map((column) =>
							// td
							h('div', column.component(row))
						)
					)
				),
			]),
		])
	)

	return {
		table: tableComponent,
	}
}
