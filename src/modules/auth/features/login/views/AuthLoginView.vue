<script setup lang="ts">
import { AxiosError } from 'axios'
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useToast } from '@/composables/core/toast/toast.composable'
import { useTypedRouter } from '@/composables/core/typedRouter.composable'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { loginFormSchema } from '@/models/auth/forms/loginForm.model'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import AuthLoginForm from '@/modules/auth/features/login/components/AuthLoginForm.vue'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const { lastLoggedInUser } = storeToRefs(authStore)

const { t } = useI18n()
const { showToast } = useToast()
const router = useTypedRouter()

const { form, onSubmitForm } = useForm({
	schema: loginFormSchema,
})

const title = computed<string>(() => {
	if (lastLoggedInUser.value === null) {
		return t('auth.login.log_in')
	}

	return t('auth.login.welcome_back_name', {
		name: lastLoggedInUser.value.firstName,
	})
})

async function handleLoggedIn(user: CurrentUser): Promise<void> {
	authStore.setLastLoginAttemptEmail(null)
	authStore.setLastLoggedInUser(user)

	await router.replace({
		name: 'index',
	})
}

function handleLoginFailed(email: string): void {
	authStore.setLastLoginAttemptEmail(email)
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

		await handleLoggedIn(currentUser)
	} catch (error) {
		handleLoginErrors(error)
		handleLoginFailed(data.email)
	}
})
</script>

<template>
	<AuthPage
		:description="t('auth.login.sign_in_to_continue')"
		:title="title"
	>
		<AuthLoginForm
			:form="form"
			:last-logged-in-user="lastLoggedInUser"
		/>
	</AuthPage>
</template>
