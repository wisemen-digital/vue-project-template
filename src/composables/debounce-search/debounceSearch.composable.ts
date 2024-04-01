import { useDebounce } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'

interface useDebounceSearchReturnType {
  debouncedSearch: Ref<null | string>
  isDebouncing: ComputedRef<boolean>
  search: Ref<null | string>
}

export function useDebouncedSearch(defaultValue?: string): useDebounceSearchReturnType {
  const search = ref<string>(defaultValue ?? '')

  const nullableSearch = computed<null | string>({
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

  const isDebouncing = computed<boolean>(() => debouncedSearch.value !== nullableSearch.value)

  return {
    debouncedSearch,
    isDebouncing,
    search: nullableSearch,
  }
}
