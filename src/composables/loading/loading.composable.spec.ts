import {
  describe,
  expect,
  it,
} from 'vitest'

import { useLoading } from '@/composables/loading/loading.composable'

describe('useLoading', () => {
  it('isLoading default be false', () => {
    const { isLoading } = useLoading()

    expect(isLoading.value).toBe(false)
  })

  it('isLoading be true when setting the state to true', () => {
    const {
      isLoading,
      setLoadingState,
    } = useLoading()

    setLoadingState(true)

    expect(isLoading.value).toBe(true)
  })
})
