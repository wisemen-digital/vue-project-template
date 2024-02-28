<script setup lang="ts">
import { computed } from 'vue'

import type { PageChangeEvent, PaginationOptions } from '@/composables/table-pagination/tablePagination.composable'
import { toLocaleNumber } from '@/utils/number.util'

import AppText from '../text/AppText.vue'
import AppTablePagination from './AppTablePagination.vue'

const props = defineProps<{
	paginationOptions: PaginationOptions<unknown>
	total: number
}>()

const emit = defineEmits<{
	page: [event: PageChangeEvent]
}>()

const currentPageFrom = computed<number>(() => {
	const { page, perPage } = props.paginationOptions.pagination

	return perPage * page + 1
})

const currentPageUntil = computed<number>(() => {
	const { page, perPage } = props.paginationOptions.pagination

	return Math.min(perPage * (page + 1), props.total)
})

function handlePageEvent(event: PageChangeEvent): void {
	emit('page', event)
}
</script>

<template>
	<div
		class="sticky bottom-0 left-0 z-10 flex w-full items-center justify-between border-t border-solid border-border bg-background px-6 py-2"
	>
		<AppText variant="subtext">
			{{ currentPageFrom }} - {{ currentPageUntil }} of {{ toLocaleNumber(props.total) }}
		</AppText>

		<AppTablePagination
			:pagination-options="paginationOptions"
			:total="props.total"
			@page="handlePageEvent"
		/>
	</div>
</template>
