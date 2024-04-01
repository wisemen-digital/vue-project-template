import type { Currency } from './currency.model'
import type { CurrencyDto } from './currencyDto.model'

const CURRENCY_MULTIPLIER = 10000

export class CurrencyTransformer {
  static fromDto(currencyDto: CurrencyDto): Currency {
    return (currencyDto / CURRENCY_MULTIPLIER) as Currency
  }

  static fromNullableDto(currencyDto: CurrencyDto | null): Currency | null {
    if (currencyDto === null) {
      return null
    }

    return CurrencyTransformer.fromDto(currencyDto)
  }

  static toDto(currency: Currency): CurrencyDto {
    return (currency * CURRENCY_MULTIPLIER) as CurrencyDto
  }

  static toNullableDto(currency: Currency | null): CurrencyDto | null {
    if (currency === null) {
      return null
    }

    return CurrencyTransformer.toDto(currency)
  }
}
