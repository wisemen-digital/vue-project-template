import { AxiosError } from 'axios'
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'
import type { z } from 'zod'

import { useToast } from '@/ui/composables/useToast'
import { logError } from '@/utils/logger.util'

/**
 * TODO
 * Maps API errors to form errors.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapApiErrorsToFormErrors(_errors: unknown): z.ZodFormattedError<unknown> {
	return {
		_errors: [],
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleAxiosError(form: Form<any>, error: AxiosError): void {
	const { t } = useI18n()
	const { showToastMessage } = useToast()

	const { response } = error
	const { status } = response ?? {}

	switch (status) {
		case 422:
			showToastMessage(t('error.validation_error'))
			form.addErrors(mapApiErrorsToFormErrors(response?.data))
			break
		case 500:
			showToastMessage(t('error.internal_server_error'))
			logError(error)
			break
		default:
			showToastMessage(t('error.default_error'))
			logError(error)
			break
	}
}

export function useHandleApiError(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: Form<any>,
	error: unknown
): void {
	if (error instanceof AxiosError) {
		handleAxiosError(form, error)
		return
	}

	throw error
}
