import { useDebounce } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import {
  computed,
  ref,
  watch,
} from 'vue'

interface UseDebounceSearchOptions {
  defaultValue?: string
  onDebounceSearch: (value: null | string) => void
}

interface useDebounceSearchReturnType {
  debouncedSearch: Ref<null | string>
  isDebouncing: ComputedRef<boolean>
  search: Ref<null | string>
}

export function useDebounceSearch(options: UseDebounceSearchOptions): useDebounceSearchReturnType {
  const search = ref<string>(options.defaultValue ?? '')

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

  watch(debouncedSearch, (value) => {
    options.onDebounceSearch(value)
  })

  return {
    debouncedSearch,
    isDebouncing,
    search: nullableSearch,
  }
}
