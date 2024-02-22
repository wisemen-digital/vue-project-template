<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import AppGrid from '@/components/app/AppGrid.vue'
import AppButton from '@/components/app/button/AppButton.vue'
import AppInput from '@/components/app/input/AppInput.vue'
import { useDebouncedSearch } from '@/composables/debounce-search/debounceSearch.composable'
import type { UserIndexFilters } from '@/models/users/index/userIndexFilters.model'
import type { Pagination } from '@/types/table/table.type'

const props = defineProps<{
	pagination: Pagination<UserIndexFilters>
}>()

const emit = defineEmits<{
	search: [value: string | null]
}>()

const { t } = useI18n()

const { search, debouncedSearch } = useDebouncedSearch(
	props.pagination.paginationOptions.value.filters?.beer_name ?? ''
)

function onDebouncedSearchChange(search: string | null): void {
	emit('search', search)
}

watch(debouncedSearch, onDebouncedSearchChange)
</script>

<template>
	<AppGrid :cols="2">
		<AppInput
			id="TODO"
			v-model="search"
		/>

		<AppButton
			:to="{
				name: 'users-create',
			}"
		>
			{{ t('users.overview.new_user') }}
		</AppButton>
	</AppGrid>
</template>
