const DECIMAL_PRECISION = 10000

export function formatCurrency(currency: number | null): string | null {
	if (currency === null) {
		return null
	}

	const euros = currency / DECIMAL_PRECISION

	return euros.toLocaleString('nl-BE', {
		currency: 'EUR',
		style: 'currency',
	})
}

export function formatFormCurrency(currency: number | null): string | null {
	if (currency === null) {
		return null
	}

	return currency.toLocaleString('nl-BE', {
		currency: 'EUR',
		style: 'currency',
	})
}

export function formatPercentage(percentage: number): string {
	return `${percentage}%`
}

export function mapCurrencyToDto(currency: number | null): number | null {
	if (currency === null) {
		return null
	}

	return Math.floor(currency * DECIMAL_PRECISION)
}

export function mapCurrencyDtoToForm(currency: number | null): number | null {
	if (currency === null) {
		return null
	}

	return currency / DECIMAL_PRECISION
}
