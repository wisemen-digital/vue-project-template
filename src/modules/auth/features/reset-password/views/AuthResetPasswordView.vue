<script setup lang="ts">
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHandleApiError } from '@/composables/handle-api-error/handleApiError.composable'
import { useTypedRouteParams } from '@/composables/router/typedRouteParams.composable'
import { useTypedRouteQuery } from '@/composables/router/typedRouteQuery.composable'
import { resetPasswordFormSchema } from '@/models/auth/reset-password/resetPasswordForm.model'
import { useAuthResetPasswordMutation } from '@/modules/auth/api/mutations/authResetPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'

import ResetPasswordForm from '../components/AuthResetPasswordForm.vue'

const hasPasswordBeenReset = ref<boolean>(false)

const { t } = useI18n()

const { form, onSubmitForm } = useForm({
	schema: resetPasswordFormSchema,
})

const { token } = useTypedRouteParams('reset-password')
const { email } = useTypedRouteQuery('reset-password')

form.register('token', token)
form.register('email', email)

const { execute: resetPassword } = useAuthResetPasswordMutation()

const description = computed<string>(() => {
	if (hasPasswordBeenReset.value) {
		return t('auth.features.your_password_has_been_reset_you_can')
	}

	return t('auth.features.enter_your_new_password_below')
})

onSubmitForm(async (values) => {
	try {
		await resetPassword({
			body: values,
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
