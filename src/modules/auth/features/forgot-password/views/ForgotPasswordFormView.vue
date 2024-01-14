<script setup lang="ts">
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { forgotPasswordForm } from '@/models/auth/forms/forgotPasswordForm.model.ts'
import { useForgotPassword } from '@/modules/auth/api/forgotPassword.post.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import ForgotPasswordReturnToLoginButton from '@/modules/auth/features/forgot-password/components/ForgotPasswordReturnToLoginButton.vue'
import { useForgotPasswordStore } from '@/modules/auth/stores/forgotPassword.store.ts'
import { mapApiErrors } from '@/utils/api.util.ts'

const forgotPasswordStore = useForgotPasswordStore()

const { lastLoginAttemptEmail } = storeToRefs(forgotPasswordStore)

const hasResetPassword = ref<boolean>(false)

const { t } = useI18n()
const { form, onSubmitForm } = useForm(forgotPasswordForm)

const { execute: forgotPassword } = useForgotPassword()

const description = computed<string>(() => {
	if (hasResetPassword.value) {
		return t('auth.features.thank_you_within_a_few_minutes_you')
	}

	return t('auth.features.dont_remember_your_password_enter_your_email')
})

onSubmitForm(async (data) => {
	try {
		await forgotPassword({
			body: data,
		})

		hasResetPassword.value = true
	} catch (error) {
		form.addErrors(mapApiErrors(error))
	}
})
</script>

<template>
	<AuthPage
		:description="description"
		:title="t('auth.features.forgot_password')"
	>
		<ForgotPasswordReturnToLoginButton v-if="hasResetPassword" />

		<ForgotPasswordForm
			v-else
			:form="form"
			:last-login-attempt-email="lastLoginAttemptEmail"
		/>
	</AuthPage>
</template>
