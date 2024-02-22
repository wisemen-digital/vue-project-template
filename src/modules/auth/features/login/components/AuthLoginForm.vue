<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppVerticalFormElementSpacer from '@/components/app/AppVerticalFormElementSpacer.vue'
import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'
import AppText from '@/components/app/text/AppText.vue'
import AppForm from '@/components/form/form/AppForm.vue'
import AppFormInput from '@/components/form/input/FormInput.vue'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import type { loginFormSchema } from '@/models/auth/login/loginForm.model'
import AuthFormSubmitButton from '@/modules/auth/components/AuthFormSubmitButton.vue'

const props = defineProps<{
	form: Form<typeof loginFormSchema>
	lastLoggedInUser: CurrentUser | null
}>()

const { t } = useI18n()

const email = props.form.register('email', props.lastLoggedInUser?.email)
const password = props.form.register('password')
</script>

<template>
	<AppForm :form="form">
		<AppVerticalFormElementSpacer>
			<AppFormInput
				v-bind="email"
				:is-required="true"
				:label="t('form.fields.email')"
				placeholder="hello@studaro.be"
				type="email"
			/>

			<AppFormInput
				v-bind="password"
				:is-required="true"
				:label="t('form.fields.password')"
				placeholder="wachtwoord"
				type="password"
			/>

			<AppTypedRouterLink
				class="py-2"
				:to="{
					name: 'forgot-password',
				}"
			>
				<AppText
					class="font-medium text-primary"
					variant="subtext"
				>
					{{ t('auth.login.forgot_password') }}
				</AppText>
			</AppTypedRouterLink>
		</AppVerticalFormElementSpacer>

		<AuthFormSubmitButton :form="form">
			{{ t('auth.login.log_in') }}
		</AuthFormSubmitButton>
	</AppForm>
</template>
