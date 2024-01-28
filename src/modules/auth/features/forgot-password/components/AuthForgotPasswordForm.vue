<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppForm from '@/components/core/AppForm.vue'
import type { forgotPasswordFormSchema } from '@/models/auth/forms/forgotPasswordForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'
import AppFormInput from '@/ui/components/input/AppFormInput.vue'

interface Props {
	form: Form<typeof forgotPasswordFormSchema>
	lastLoginAttemptEmail: string | null
}

const { form, lastLoginAttemptEmail } = defineProps<Props>()

const { t } = useI18n()

const email = form.register('email', lastLoginAttemptEmail ?? undefined)
</script>

<template>
	<AppForm :form="form">
		<AppFormInput
			v-bind="email"
			:is-required="true"
			:label="t('form.fields.email')"
			type="email"
		/>

		<AuthFormSubmitButton
			:form="form"
			:is-always-enabled="true"
		>
			{{ t('auth.forgot_password.send_link') }}
		</AuthFormSubmitButton>
	</AppForm>
</template>
