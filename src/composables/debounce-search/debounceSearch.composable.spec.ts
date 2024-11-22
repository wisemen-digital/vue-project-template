import {
  describe,
  expect,
  it,
} from 'vitest'

import { useDebounceSearch } from '@/composables/debounce-search/debounceSearch.composable'

describe('useDebounceSearch', () => {
  it('should be at the default state', () => {
    const {
      isDebouncing,
      debouncedSearch,
      search,
    } = useDebounceSearch({
      onDebounceSearch: () => {},
    })

    expect(debouncedSearch.value).toBe('')
    expect(search.value).toBe('')
    expect(isDebouncing.value).toBeFalsy()
  })

  it('should be debouncing', () => {
    let isCallbackCalled = false

    const {
      isDebouncing,
      debouncedSearch,
      search,
    } = useDebounceSearch({
      onDebounceSearch: () => {
        isCallbackCalled = true
      },
    })

    search.value = 'test'

    expect(debouncedSearch.value).toBe('')
    expect(isDebouncing.value).toBeTruthy()

    setTimeout(() => {
      expect(debouncedSearch.value).toBe('test')
      expect(isDebouncing.value).toBeFalsy()
      expect(isCallbackCalled).toBeTruthy()
    }, 300)
  })
})
