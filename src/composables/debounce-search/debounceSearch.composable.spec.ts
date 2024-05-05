import {
  describe,
  expect,
  it,
} from 'vitest'

import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'

describe('useDebounceSearch', () => {
  it('should be at the default state', () => {
    const {
      debouncedSearch,
      isDebouncing,
      search,
    } = useDebounceSearch({
      onDebounceSearch: () => {},
    })

    expect(debouncedSearch.value).toBe('')
    expect(search.value).toBe('')
    expect(isDebouncing.value).toBe(false)
  })

  it('should be debouncing', () => {
    let isCallbackCalled = false

    const {
      debouncedSearch,
      isDebouncing,
      search,
    } = useDebounceSearch({
      onDebounceSearch: () => {
        isCallbackCalled = true
      },
    })

    search.value = 'test'

    expect(debouncedSearch.value).toBe('')
    expect(isDebouncing.value).toBe(true)

    setTimeout(() => {
      expect(debouncedSearch.value).toBe('test')
      expect(isDebouncing.value).toBe(false)
      expect(isCallbackCalled).toBe(true)
    }, 300)
  })
})
