<script setup lang="ts">
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHandleApiError } from '@/composables/core/handle-api-error/handleApiError.composable'
import { useTypedRouteParams } from '@/composables/core/router/typedRouteParams.composable'
import { useTypedRouteQuery } from '@/composables/core/router/typedRouteQuery.composable'
import { resetPasswordFormSchema } from '@/models/auth/forms/resetPasswordForm.model'
import { useAuthResetPasswordMutation } from '@/modules/auth/api/mutations/authResetPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import { mapResetPasswordFormToResetPasswordRequestDto } from '@/transformers/auth.transformer.ts'

import ResetPasswordForm from '../components/AuthResetPasswordForm.vue'

const hasPasswordBeenReset = ref<boolean>(false)

const { t } = useI18n()

const { form, onSubmitForm } = useForm({
	schema: resetPasswordFormSchema,
})

const { token } = useTypedRouteParams('reset-password')
const { email } = useTypedRouteQuery('reset-password')

const { execute: resetPassword } = useAuthResetPasswordMutation()

const description = computed<string>(() => {
	if (hasPasswordBeenReset.value) {
		return t('auth.features.your_password_has_been_reset_you_can')
	}

	return t('auth.features.enter_your_new_password_below')
})

onSubmitForm(async ({ password }) => {
	try {
		await resetPassword({
			body: mapResetPasswordFormToResetPasswordRequestDto({
				email: email as string,
				password,
				token,
			}),
		})

		hasPasswordBeenReset.value = true
	} catch (error) {
		useHandleApiError(error, form)
	}
})
</script>

<template>
	<AuthPage
		:description="description"
		:title="t('common.reset_password')"
	>
		<ResetPasswordForm
			v-if="!hasPasswordBeenReset"
			:form="form"
		/>
	</AuthPage>
</template>
