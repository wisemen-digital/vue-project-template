<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppVerticalFormElementSpacer from '@/components/app/AppVerticalFormElementSpacer.vue'
import AppForm from '@/components/core/AppForm.vue'
import AppText from '@/components/core/AppText.vue'
import AppTypedRouterLink from '@/components/core/AppTypedRouterLink.vue'
import type { CurrentUser } from '@/models/auth/currentUser.model'
import type { loginFormSchema } from '@/models/auth/forms/loginForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'
import AppFormInput from '@/ui/components/input/AppFormInput.vue'

const { form, lastLoggedInUser } = defineProps<{
	form: Form<typeof loginFormSchema>
	lastLoggedInUser: CurrentUser | null
}>()

const { t } = useI18n()

const email = form.register('email', lastLoggedInUser?.email)
const password = form.register('password')
</script>

<template>
	<AppForm :form="form">
		<AppVerticalFormElementSpacer>
			<AppFormInput
				v-bind="email"
				:is-required="true"
				:label="t('form.fields.email')"
				type="email"
			/>

			<AppFormInput
				v-bind="password"
				:is-required="true"
				:label="t('form.fields.password')"
				type="password"
			/>

			<AppTypedRouterLink
				class="self-start"
				:to="{
					name: 'forgot-password-form',
				}"
			>
				<AppText variant="subtext">
					{{ t('auth.login.forgot_password') }}
				</AppText>
			</AppTypedRouterLink>
		</AppVerticalFormElementSpacer>

		<AuthFormSubmitButton :form="form">
			{{ t('auth.login.log_in') }}
		</AuthFormSubmitButton>
	</AppForm>
</template>
