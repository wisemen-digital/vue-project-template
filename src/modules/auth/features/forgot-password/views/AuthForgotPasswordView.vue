<script setup lang="ts">
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHandleApiError } from '@/composables/core/handleApiError.composable'
import { forgotPasswordFormSchema } from '@/models/auth/forms/forgotPasswordForm.model.ts'
import { useAuthForgotPasswordMutation } from '@/modules/auth/api/mutations/authForgotPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import ForgotPasswordReturnToLoginButton from '@/modules/auth/features/forgot-password/components/AuthForgotPasswordReturnToLoginButton.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

import ForgotPasswordForm from '../components/AuthForgotPasswordForm.vue'

const authStore = useAuthStore()

const { lastLoginAttemptEmail } = storeToRefs(authStore)

const hasResetPassword = ref<boolean>(false)

const { t } = useI18n()

const { form, onSubmitForm } = useForm({
	schema: forgotPasswordFormSchema,
})

const { execute: forgotPassword } = useAuthForgotPasswordMutation()

const description = computed<string>(() => {
	if (hasResetPassword.value) {
		return t('auth.forgot_password.success_message')
	}

	return t('auth.forgot_password.forgot_your_password')
})

onSubmitForm(async (data) => {
	try {
		await forgotPassword({
			body: data,
		})

		hasResetPassword.value = true
	} catch (error) {
		useHandleApiError(error, form)
	}
})
</script>

<template>
	<AuthPage
		:description="description"
		:title="t('auth.forgot_password.forgot_password')"
	>
		<ForgotPasswordReturnToLoginButton v-if="hasResetPassword" />

		<ForgotPasswordForm
			v-else
			:form="form"
			:last-login-attempt-email="lastLoginAttemptEmail"
		/>
	</AuthPage>
</template>
