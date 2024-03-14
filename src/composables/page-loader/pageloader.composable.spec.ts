import {
  describe,
  expect,
  it,
} from 'vitest'

import { usePageLoader } from '@/composables/page-loader/pageLoader.composable'

describe('usePageLoader', () => {
  it('isLoading is default false', () => {
    const { isLoading } = usePageLoader()
    expect(isLoading.value).toBe(false)
  })

  it('changes isLoading to the correct state', () => {
    const { isLoading, setIsLoading } = usePageLoader()

    setIsLoading(true)
    expect(isLoading.value).toBe(true)
  })
})
