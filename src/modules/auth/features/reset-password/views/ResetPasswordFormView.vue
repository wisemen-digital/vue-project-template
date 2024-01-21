<script setup lang="ts">
import { useRouteParams, useRouteQuery } from '@vueuse/router'
import { useForm } from 'formango'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { resetPasswordForm } from '@/models/auth/forms/resetPasswordForm.model'
import { useResetPasswordCommand } from '@/modules/auth/commands/resetPassword.command.ts'
import AuthPage from '@/modules/auth/components/AuthPage.vue'
import { mapResetPasswordFormToResetPasswordRequestDto } from '@/transformers/auth.transformer.ts'
import { mapApiErrors } from '@/utils/api.util.ts'

import ResetPasswordForm from '../components/ResetPasswordForm.vue'

const { t } = useI18n()

const emailQuery = useRouteQuery<string>('email')
const tokenParam = useRouteParams<string>('reset-password-form')

const hasPasswordBeenReset = ref<boolean>(false)

const resetPasswordCommand = useResetPasswordCommand()
const { form, onSubmitForm } = useForm(resetPasswordForm)

const description = computed<string>(() => {
	if (hasPasswordBeenReset.value) {
		return t('auth.features.your_password_has_been_reset_you_can')
	}

	return t('auth.features.enter_your_new_password_below')
})

onSubmitForm(async ({ password }) => {
	try {
		await resetPasswordCommand.execute({
			body: mapResetPasswordFormToResetPasswordRequestDto({
				email: emailQuery.value,
				password: password,
				token: tokenParam.value,
			}),
		})

		hasPasswordBeenReset.value = true
	} catch (error) {
		form.addErrors(mapApiErrors(error))
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
