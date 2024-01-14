<script setup lang="ts" generic="T">
import { AxiosError } from 'axios'
import { watch } from 'vue'

import type { UseQueryReturnType } from '@/composables/core/useQuery'

interface Props {
	queryFn: () => UseQueryReturnType<T>
}

const { queryFn } = defineProps<Props>()

const { data, isLoading, isError, error } = queryFn()

watch(error, () => {
	// eslint-disable-next-line no-console
	console.log(error.value)
})
</script>

<template>
	<div
		v-if="isLoading"
		class="flex flex-1 items-center justify-center"
	>
		<AppLoader class="h-5 w-5" />
	</div>

	<div
		v-else-if="isError && error != null && error instanceof AxiosError"
		class="flex flex-1 items-center justify-center"
	>
		<AppErrorState
			:message="error.message"
			:status="error.response?.status ?? 0"
		>
			{{ error }}
		</AppErrorState>
	</div>

	<slot
		v-else-if="data != null"
		:data="data"
	/>
</template>
