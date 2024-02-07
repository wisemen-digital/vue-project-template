<script setup lang="ts" generic="TSchema">
import AppText from '@/components/core/text/AppText.vue'
import type { TableColumn } from '@/models/core/table/table.model'

import AppTableTextCell from './AppTableTextCell.vue'

type Props = {
	data: TSchema[]
	gridTemplateColumns: string
	columns: TableColumn<TSchema>[]
	pinFirstColumn: boolean
	pinLastColumn: boolean
	isHorizontallyScrollable: boolean
	isScrolledToRight: boolean
	hasReachedHorizontalScrollEnd: boolean
	isLoading?: boolean
	emptyMessage?: string
}

const {
	data,
	gridTemplateColumns,
	columns,
	pinFirstColumn,
	pinLastColumn,
	isHorizontallyScrollable,
	isScrolledToRight,
	hasReachedHorizontalScrollEnd,
} = defineProps<Props>()
</script>

<template>
	<div>
		<div
			v-if="!isLoading && data.length == 0 && emptyMessage"
			class="flex items-center justify-center p-4"
		>
			<AppText variant="subtext">
				{{ emptyMessage }}
			</AppText>
		</div>

		<div
			v-for="(row, index) in data"
			:key="index"
			class="grid items-center border-b border-solid border-border last:border-none"
			:class="[isHorizontallyScrollable ? 'w-fit' : 'w-full']"
			:style="{
				gridTemplateColumns,
			}"
		>
			<div
				v-for="column in columns"
				:key="column.id"
				class="flex h-full items-center px-6 py-4"
				:class="[
					isScrolledToRight ? 'first:border-r-border' : 'first:border-r-transparent',
					hasReachedHorizontalScrollEnd ? 'last:border-l-transparent' : 'last:border-l-border',
					{
						'left-0 bg-background first:sticky first:z-10 first:border-r first:border-solid': pinFirstColumn,
					},
					{
						'right-0 bg-background last:sticky last:z-10 last:border-l last:border-solid':
							pinLastColumn && isHorizontallyScrollable,
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
		</div>
	</div>
</template>
