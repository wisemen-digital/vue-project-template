<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppForm from '@/components/form/form/AppForm.vue'
import AppFormInput from '@/components/form/input/FormInput.vue'
import type { resetPasswordFormSchema } from '@/models/auth/reset-password/resetPasswordForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'

const props = defineProps<{
	form: Form<typeof resetPasswordFormSchema>
}>()

const { t } = useI18n()

const password = props.form.register('password')
</script>

<template>
	<AppForm :form="form">
		<AppFormInput
			v-bind="password"
			:label="t('common.password')"
			type="password"
		/>

		<AuthFormSubmitButton :form="form">
			{{ t('common.reset_password') }}
		</AuthFormSubmitButton>
	</AppForm>
</template>
