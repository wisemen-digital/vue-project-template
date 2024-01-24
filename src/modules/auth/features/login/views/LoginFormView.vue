<script setup lang="ts">
import { AxiosError } from 'axios'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTypedRouter } from '@/composables/core/typedRouter.composable'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { loginForm } from '@/models/auth/forms/loginForm.model'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import { useForgotPasswordStore } from '@/modules/auth/stores/forgotPassword.store.ts'
import { useLoginStore } from '@/modules/auth/stores/login.store.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { useToast } from '@/ui/composables/useToast.ts'

import LoginForm from '../components/LoginForm.vue'

const loginStore = useLoginStore()
const authStore = useAuthStore()
const forgotPasswordStore = useForgotPasswordStore()

const { lastLoggedInUser } = storeToRefs(loginStore)

const { t } = useI18n()
const { showToast } = useToast()
const { form, onSubmitForm } = useForm({
	schema: loginForm,
})
const router = useTypedRouter()

const title = computed<string>(() => {
	if (lastLoggedInUser.value === null) {
		return t('auth.login.log_in')
	}

	return t('auth.login.welcome_back_name', {
		name: lastLoggedInUser.value.firstName,
	})
})

async function onLoggedIn(user: CurrentUser): Promise<void> {
	forgotPasswordStore.setLastLoginAttemptEmail(null)
	loginStore.setLastLoggedInUser(user)

	await router.replace({
		name: 'index',
	})
}

function onLoginFailed(email: string): void {
	forgotPasswordStore.setLastLoginAttemptEmail(email)
	showToast({
		title: t('auth.login.invalid_email_or_password'),
	})
}

function handleLoginErrors(error: unknown): void {
	if (error instanceof AxiosError) {
		form.addErrors({
			password: {
				_errors: [t('auth.login.invalid_email_or_password')],
			},
		})
	} else {
		throw error
	}
}

onSubmitForm(async (data) => {
	try {
		await authStore.login(data)
		const currentUser = await authStore.getCurrentUser()

		await onLoggedIn(currentUser)
	} catch (error) {
		handleLoginErrors(error)
		onLoginFailed(data.email)
	}
})
</script>

<template>
	<AuthPage
		:description="t('auth.login.sign_in_to_continue')"
		:title="title"
	>
		<LoginForm
			:form="form"
			:last-logged-in-user="lastLoggedInUser"
		/>
	</AuthPage>
</template>
