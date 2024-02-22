import { AxiosError } from 'axios'
import type { Form } from 'formango'
import type { z } from 'zod'

// import { i18nPlugin } from '@/plugins/i18n/i18n.plugin'
import { logError, logInfo } from '@/utils/logger.util'

/**
 * TODO
 * Maps API errors to form errors.
 */
function mapApiErrorsToFormErrors(errors: unknown): z.ZodFormattedError<unknown> {
	logInfo(errors)

	return {
		_errors: [],
	}
}

function handleAxiosError<T extends z.ZodType>(error: AxiosError, form?: Form<T>): void {
	// const { t } = i18nPlugin.global

	const { response } = error
	const { status } = response ?? {}

	switch (status) {
		case 403:
			// showToast({
			// 	title: t('error.forbidden'),
			// })
			break
		case 422:
			// showToast({
			// 	title: t('error.validation_error'),
			// })
			const mappedErrors = mapApiErrorsToFormErrors(response?.data)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			form?.addErrors(mappedErrors as any)
			break
		case 500:
			// showToast({
			// 	title: t('error.internal_server_error'),
			// })
			logError(error)
			break
		default:
			// showToast({
			// 	title: t('error.default_error'),
			// })
			logError(error)
			break
	}
}

export function useHandleApiError<T extends z.ZodType>(error: unknown, form?: Form<T>): void {
	if (error instanceof AxiosError) {
		handleAxiosError(error, form)
		return
	}

	throw error
}
