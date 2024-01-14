import { describe, expect, test } from 'vitest'

import { useLoading } from '@/composables/core/loading/loading.composable.ts'

describe('useLoading', () => {
	test('isLoading default be false', () => {
		const { isLoading } = useLoading()

		expect(isLoading.value).toBe(false)
	})

	test('isLoading be true when setting the state to true', () => {
		const { isLoading, setLoadingState } = useLoading()

		setLoadingState(true)

		expect(isLoading.value).toBe(true)
	})
})
