<script setup lang="ts" generic="TSchema">
import type { Component } from 'vue'
import { computed } from 'vue'

import type { TableColumn } from '@/types/table/table.type'

import AppFocusable from '../focusable/AppFocusable.vue'
import AppText from '../text/AppText.vue'
import AppTableSkeletonLoader from './AppTableSkeletonLoader.vue'
import AppTableTextCell from './AppTableTextCell.vue'

const props = defineProps<{
	data: TSchema[]
	columns: TableColumn<TSchema>[]
	gridTemplateColumns: string
	pinFirstColumn: boolean
	pinLastColumn: boolean
	isScrolledToRight: boolean
	isHorizontallyScrollable: boolean
	hasReachedHorizontalScrollEnd: boolean
	isLoading: boolean
	isRowClickable: boolean
	emptyMessage: string
}>()

const emit = defineEmits<{
	'row:click': [row: TSchema]
}>()

const rowComponent = computed<Component | string>(() => {
	if (props.isRowClickable) {
		return AppFocusable
	}

	return 'div'
})

function handleRowClick(row: TSchema): void {
	if (!props.isRowClickable) {
		return
	}

	emit('row:click', row)
}
</script>

<template>
	<div class="flex h-full w-full flex-1 flex-col">
		<AppTableSkeletonLoader v-if="props.isLoading" />

		<div
			v-else-if="props.data.length === 0 && props.emptyMessage !== null"
			class="flex h-full items-center justify-center p-4"
		>
			<AppText variant="subtext">
				{{ props.emptyMessage }}
			</AppText>
		</div>

		<Component
			:is="rowComponent"
			v-for="(row, index) in props.data"
			:key="index"
			class="group grid items-center rounded-none border-b border-solid border-border last:border-none"
			:class="[props.isHorizontallyScrollable ? 'w-fit' : 'w-full']"
			:style="{
				gridTemplateColumns: props.gridTemplateColumns,
			}"
			@click="handleRowClick(row)"
		>
			<div
				v-for="column in props.columns"
				:key="column.id"
				class="flex h-full items-center px-6 py-4"
				:class="[
					props.isScrolledToRight ? 'first:border-r-border' : 'first:border-r-transparent',
					props.hasReachedHorizontalScrollEnd ? 'last:border-l-transparent' : 'last:border-l-border',
					{
						'left-0 bg-background first:sticky first:z-10 first:border-r first:border-solid': props.pinFirstColumn,
					},
					{
						'right-0 bg-background last:sticky last:z-10 last:border-l last:border-solid':
							props.pinLastColumn && props.isHorizontallyScrollable,
					},
					{
						'group-hover:bg-muted-background group-focus-visible:bg-muted-background': props.isRowClickable,
					},
				]"
			>
				<Component
					:is="column.render(row)"
					v-if="column.render !== undefined"
				/>

				<AppTableTextCell v-else>
					{{ column.value(row) }}
				</AppTableTextCell>
			</div>
		</Component>
	</div>
</template>
