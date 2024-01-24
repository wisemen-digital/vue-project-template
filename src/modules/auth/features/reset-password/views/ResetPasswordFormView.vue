<script setup lang="ts">
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useHandleApiError } from '@/composables/core/handleApiError.composable'
import { useTypedRouteParams } from '@/composables/core/typedRouteParams.composable'
import { resetPasswordForm } from '@/models/auth/forms/resetPasswordForm.model'
import { useResetPassword } from '@/modules/auth/api/resetPassword.post.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import { mapResetPasswordFormToResetPasswordRequestDto } from '@/transformers/auth.transformer.ts'

import ResetPasswordForm from '../components/ResetPasswordForm.vue'

const hasPasswordBeenReset = ref<boolean>(false)

const router = useRoute()
const { t } = useI18n()
const { form, onSubmitForm } = useForm({
	schema: resetPasswordForm,
})
const { token } = useTypedRouteParams('reset-password-form')

const { email } = router.query

const { execute: resetPassword } = useResetPassword()

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
