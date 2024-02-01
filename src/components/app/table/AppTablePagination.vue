<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '@/components/core/button/AppButton.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppText from '@/components/core/text/AppText.vue'
import type { PageChangeEvent, PaginationOptions } from '@/composables/core/tablePagination.composable'

type Props = {
	paginationOptions: PaginationOptions<unknown>
	total: number
}

type Emits = {
	page: [event: PageChangeEvent]
}

const { paginationOptions, total } = defineProps<Props>()

const emit = defineEmits<Emits>()

const pageControls = computed<(number | string)[]>(() => {
	const { page, perPage } = paginationOptions.pagination

	const totalPages = Math.ceil(total / perPage)

	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	const pages = []

	if (page === 1) {
		pages.push(1, 2, 3, '...', totalPages)
	} else if (page === 2) {
		pages.push(1, 2, 3, 4, '...', totalPages)
	} else if (page === totalPages) {
		pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
	} else if (page === totalPages - 1) {
		pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
	} else {
		pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
	}

	return pages
})

const isFirstPage = computed<boolean>(() => {
	const { page } = paginationOptions.pagination

	return page === 1
})

const isLastPage = computed<boolean>(() => {
	const { page, perPage } = paginationOptions.pagination

	const totalPages = Math.ceil(total / perPage)

	return page === totalPages
})

function setPage(page: number): void {
	const updatedPaginationOptions = {
		...paginationOptions.pagination,
		page,
	} as PageChangeEvent

	emit('page', updatedPaginationOptions)
}

function handlePrevPage(): void {
	const { page } = paginationOptions.pagination

	if (page === 1) {
		return
	}

	setPage(page - 1)
}

function handleNextPage(): void {
	const { page, perPage } = paginationOptions.pagination

	const totalPages = Math.ceil(total / perPage)

	if (page === totalPages) {
		return
	}

	setPage(page + 1)
}

function handlePrevPageButtonClick(): void {
	handlePrevPage()
}

function handleNextPageButtonClick(): void {
	handleNextPage()
}

function handlePageButtonClick(page: number): void {
	setPage(page)
}

function pageControlButtonVariant(page: number): 'ghost' | 'secondary' {
	return page === paginationOptions.pagination.page ? 'secondary' : 'ghost'
}
</script>

<template>
	<div class="flex items-center rounded-md border">
		<AppButton
			v-if="!isFirstPage"
			size="icon"
			variant="ghost"
			@click="handlePrevPageButtonClick"
		>
			<AppIcon
				class="h-3 w-3"
				icon="arrowLeft"
			/>
		</AppButton>

		<div
			v-for="(page, index) of pageControls"
			:key="index"
		>
			<AppButton
				v-if="typeof page === 'number'"
				class="duration-0"
				:variant="pageControlButtonVariant(page)"
				@click="handlePageButtonClick(page)"
			>
				{{ page }}
			</AppButton>

			<AppText
				v-else
				class="cursor-default px-2"
				variant="subtext"
			>
				{{ page }}
			</AppText>
		</div>

		<AppButton
			v-if="!isLastPage"
			size="icon"
			variant="ghost"
			@click="handleNextPageButtonClick"
		>
			<AppIcon
				class="h-3 w-3"
				icon="arrowRight"
			/>
		</AppButton>
	</div>
</template>
