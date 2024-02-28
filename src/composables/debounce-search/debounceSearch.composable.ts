import { useDebounce } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

interface useDebounceSearchReturnType {
	search: Ref<string | null>
	debouncedSearch: Ref<string | null>
}

export function useDebouncedSearch(defaultValue: string): useDebounceSearchReturnType {
	const search = ref<string>(defaultValue)

	const nullableSearch = computed<string | null>({
		get: () => {
			if (search.value.trim() === '') {
				return null
			}

			return search.value
		},
		set: (value) => {
			search.value = value ?? ''
		},
	})

	const debouncedSearch = useDebounce(nullableSearch, 300)

	return {
		search: nullableSearch,
		debouncedSearch,
	}
}
