<script setup lang="ts">
import { computed } from 'vue'

import AppText from '@/components/core/text/AppText.vue'
import type { PageChangeEvent, PaginationOptions } from '@/composables/core/tablePagination.composable'

import AppTablePagination from './AppTablePagination.vue'

type Props = {
	paginationOptions: PaginationOptions<unknown>
	total: number
}

type Emits = {
	page: [event: PageChangeEvent]
}

const { paginationOptions, total } = defineProps<Props>()

const emit = defineEmits<Emits>()

const currentPageFrom = computed<number>(() => {
	const { page, perPage } = paginationOptions.pagination

	return perPage * (page - 1) + 1
})

const currentPageUntil = computed<number>(() => {
	const { page, perPage } = paginationOptions.pagination

	return Math.min(perPage * page, total)
})

function handlePageEvent(event: PageChangeEvent): void {
	emit('page', event)
}
</script>

<template>
	<div
		class="sticky bottom-0 left-0 z-10 flex w-full items-center justify-between border-t border-solid border-border bg-background px-6 py-2"
	>
		<AppText variant="subtext"> {{ currentPageFrom }} - {{ currentPageUntil }} of {{ total }} </AppText>

		<AppTablePagination
			:pagination-options="paginationOptions"
			:total="total"
			@page="handlePageEvent"
		/>
	</div>
</template>
