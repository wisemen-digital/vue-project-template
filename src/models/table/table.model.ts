import type { VNode } from 'vue'

interface BaseTableColumn {
	id: string
	label: string
	isSortable?: boolean
	size: string
}

interface TableColumnWithRender<TSchema> extends BaseTableColumn {
	render: (row: TSchema) => VNode
	value?: never
}

interface TableColumnWithValue<TSchema> extends BaseTableColumn {
	value: (row: TSchema) => string
	render?: never
}

export type TableColumn<TSchema> = TableColumnWithRender<TSchema> | TableColumnWithValue<TSchema>

interface TableFilterBase<TFilters> {
	id: keyof TFilters
	label: string
}

export interface TableFilterWithOptions<TFilters> extends TableFilterBase<TFilters> {
	type: 'multiselect' | 'select'
	options: { label: string; value: string }[]
}

export interface TableFilterBoolean<TFilters> extends TableFilterBase<TFilters> {
	type: 'boolean'
}

export interface TableFilterText<TFilters> extends TableFilterBase<TFilters> {
	type: 'text'
}

export type TableFilter<TFilters> =
	| TableFilterBoolean<TFilters>
	| TableFilterText<TFilters>
	| TableFilterWithOptions<TFilters>
