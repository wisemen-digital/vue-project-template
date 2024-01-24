import { AxiosError } from 'axios'
import type { Form } from 'formango'
import type { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin'
import { useToast } from '@/ui/composables/useToast'
import { logError, logInfo } from '@/utils/logger.util'

/**
 * TODO
 * Maps API errors to form errors.
 */
function mapApiErrorsToFormErrors(errors: unknown): Record<string, never> | z.ZodFormattedError<unknown> {
	logInfo(errors)

	return {
		_errors: [],
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleAxiosError(error: AxiosError, form?: Form<any>): void {
	const { t } = i18nPlugin.global
	const { showToast } = useToast()

	const { response } = error
	const { status } = response ?? {}

	switch (status) {
		case 403:
			showToast({
				title: t('error.forbidden'),
			})
			break
		case 422:
			showToast({
				title: t('error.validation_error'),
			})
			form?.addErrors(mapApiErrorsToFormErrors(response?.data ?? {}))
			break
		case 500:
			showToast({
				title: t('error.internal_server_error'),
			})
			logError(error)
			break
		default:
			showToast({
				title: t('error.default_error'),
			})
			logError(error)
			break
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useHandleApiError(error: unknown, form?: Form<any>): void {
	if (error instanceof AxiosError) {
		handleAxiosError(error, form)
		return
	}

	throw error
}
