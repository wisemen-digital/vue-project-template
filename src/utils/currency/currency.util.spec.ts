import { describe, expect, test } from 'vitest'

import {
	formatCurrency,
	formatPercentage,
	mapCurrencyDtoToForm,
	mapCurrencyToDto,
} from '@/utils/currency/currency.util'

describe('currency util', () => {
	describe('formatCurrency', () => {
		test('return null when input is null', () => {
			const input = null

			const result = formatCurrency(input)

			expect(result).toBe(null)
		})

		test('return correctly formatted number', () => {
			const input = 100000

			const result = formatCurrency(input)

			expect(result).toBe('€ 10,00')
		})
	})

	describe('formatPercentage', () => {
		test('return correctly formatted number', () => {
			const input = 10

			const result = formatPercentage(input)

			expect(result).toBe('10%')
		})
	})

	describe('mapCurrencyToDto', () => {
		test('return null when input is null', () => {
			const input = null

			const result = mapCurrencyToDto(input)

			expect(result).toBe(null)
		})

		test('return correctly formatted number', () => {
			const input = 1

			const result = mapCurrencyToDto(input)

			expect(result).toBe(10000)
		})
	})

	describe('mapCurrencyDtoToForm', () => {
		test('return null when input is null', () => {
			const input = null

			const result = mapCurrencyDtoToForm(input)

			expect(result).toBe(null)
		})

		test('return correctly formatted number', () => {
			const input = 10000

			const result = mapCurrencyDtoToForm(input)

			expect(result).toBe(1)
		})
	})
})
