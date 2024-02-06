<script setup lang="ts">
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/core/button/AppButton.vue'
import { useToast } from '@/composables/core/toast/toast.composable.ts'
import type { ForgotPasswordForm } from '@/models/auth/forms/forgotPasswordForm.model.ts'
import { forgotPasswordFormSchema } from '@/models/auth/forms/forgotPasswordForm.model.ts'
import { useAuthForgotPasswordMutation } from '@/modules/auth/api/mutations/authForgotPassword.mutation.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import AuthForgotPasswordForm from '@/modules/auth/features/forgot-password/components/AuthForgotPasswordForm.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const { lastLoginAttemptEmail } = storeToRefs(authStore)

const hasResetPassword = ref<boolean>(false)

const { t } = useI18n()
const toast = useToast()

const resetEmail = ref<string>('')

const { form, onSubmitForm } = useForm({
	schema: forgotPasswordFormSchema,
})

const forgotPasswordMutation = useAuthForgotPasswordMutation()

const title = computed<string>(() => {
	if (hasResetPassword.value) {
		return t('auth.check_your_email')
	}

	return t('auth.forgot_password')
})

const description = computed<string>(() => {
	if (hasResetPassword.value) {
		return t('auth.instruction_email_sent_to', { email: resetEmail.value })
	}

	return t('auth.forgot_password_message')
})

onSubmitForm(async (data: ForgotPasswordForm) => {
	try {
		await forgotPasswordMutation.execute({ body: data })
		hasResetPassword.value = true
		resetEmail.value = data.email
	} catch (error) {
		toast.showToastApiError(error)
	}
})
</script>

<template>
	<AuthPage
		:description="description"
		:title="title"
	>
		<AuthForgotPasswordForm
			v-if="!hasResetPassword"
			:form="form"
			:last-login-attempt-email="lastLoginAttemptEmail"
		/>

		<div class="mt-4 flex justify-center">
			<AppButton
				icon-left="arrowLeft"
				:to="{ name: 'login' }"
				variant="ghost"
			>
				{{ t('auth.back_to_login') }}
			</AppButton>
		</div>
	</AuthPage>
</template>
