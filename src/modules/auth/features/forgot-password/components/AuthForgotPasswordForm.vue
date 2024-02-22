<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppForm from '@/components/form/form/AppForm.vue'
import AppFormInput from '@/components/form/input/FormInput.vue'
import type { forgotPasswordFormSchema } from '@/models/auth/forgot-password/forgotPasswordForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'

const props = defineProps<{
	form: Form<typeof forgotPasswordFormSchema>
	lastLoginAttemptEmail: string | null
}>()

const { t } = useI18n()

const email = props.form.register('email', props.lastLoginAttemptEmail ?? undefined)
</script>

<template>
	<AppForm :form="form">
		<AppFormInput
			v-bind="email"
			icon-left="mail"
			:is-required="true"
			:label="t('form.fields.email')"
			:placeholder="t('auth.enter_your_email')"
			type="email"
		/>

		<AuthFormSubmitButton
			:form="form"
			:is-always-enabled="true"
		>
			{{ t('auth.reset_password') }}
		</AuthFormSubmitButton>
	</AppForm>
</template>
