import type { Currency } from './currency.model'
import type { CurrencyDto } from './currencyDto.model'

interface CurrencyTransformer {
  fromDto: (currencyDto: CurrencyDto) => Currency
  fromNullableDto: (currencyDto: CurrencyDto | null) => Currency | null
  toDto: (currency: Currency) => CurrencyDto
  toNullableDto: (currency: Currency | null) => CurrencyDto | null
}

const CURRENCY_MULTIPLIER = 10000

export const currencyTransformer: CurrencyTransformer = {
  fromDto(currencyDto: CurrencyDto): Currency {
    return (currencyDto / CURRENCY_MULTIPLIER) as Currency
  },
  fromNullableDto(currencyDto: CurrencyDto | null): Currency | null {
    return currencyDto === null ? null : currencyTransformer.fromDto(currencyDto)
  },
  toDto(currency: Currency): CurrencyDto {
    return (currency * CURRENCY_MULTIPLIER) as CurrencyDto
  },
  toNullableDto(currency: Currency | null): CurrencyDto | null {
    return currency === null ? null : currencyTransformer.toDto(currency)
  },
}
