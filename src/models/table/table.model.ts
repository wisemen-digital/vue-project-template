import type { VNode } from 'vue'

export interface TableColumn<TSchema> {
	id: string
	name: string
	isSortable?: boolean
	size: string
	render: (row: TSchema) => VNode
}

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
