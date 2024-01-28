<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppForm from '@/components/core/AppForm.vue'
import type { resetPasswordFormSchema } from '@/models/auth/forms/resetPasswordForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'
import AppFormInput from '@/ui/components/input/AppFormInput.vue'

interface Props {
	form: Form<typeof resetPasswordFormSchema>
}

const { form } = defineProps<Props>()

const { t } = useI18n()

const password = form.register('password')
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
