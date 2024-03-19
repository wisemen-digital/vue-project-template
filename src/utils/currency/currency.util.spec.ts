import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  formatCurrency,
  formatPercentage,
  mapCurrencyDtoToForm,
  mapCurrencyToDto,
} from '@/utils/currency/currency.util'

describe('currency util', () => {
  describe('formatCurrency', () => {
    it('return null when input is null', () => {
      const input = null

      const result = formatCurrency(input)

      expect(result).toBe(null)
    })

    it('return correctly formatted number', () => {
      const input = 100000

      const result = formatCurrency(input)

      expect(result).toBe('€ 10,00')
    })
  })

  describe('formatPercentage', () => {
    it('return correctly formatted number', () => {
      const input = 10

      const result = formatPercentage(input)

      expect(result).toBe('10%')
    })
  })

  describe('mapCurrencyToDto', () => {
    it('return null when input is null', () => {
      const input = null

      const result = mapCurrencyToDto(input)

      expect(result).toBe(null)
    })

    it('return correctly formatted number', () => {
      const input = 1

      const result = mapCurrencyToDto(input)

      expect(result).toBe(10000)
    })
  })

  describe('mapCurrencyDtoToForm', () => {
    it('return null when input is null', () => {
      const input = null

      const result = mapCurrencyDtoToForm(input)

      expect(result).toBe(null)
    })

    it('return correctly formatted number', () => {
      const input = 10000

      const result = mapCurrencyDtoToForm(input)

      expect(result).toBe(1)
    })
  })
})
