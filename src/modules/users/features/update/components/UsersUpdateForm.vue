<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/form/AppForm.vue'
import AppFormSubmitButton from '@/components/form/form/AppFormSubmitButton.vue'
import type { userUpdateFormSchema } from '@/models/users/update/userUpdateForm.model'
import UsersFormName from '@/modules/users/components/user-form/UsersFormName.vue'

const props = defineProps<{
	form: Form<typeof userUpdateFormSchema>
}>()

const { t } = useI18n()

const firstName = props.form.register('firstName')
const lastName = props.form.register('lastName')
</script>

<template>
	<AppForm :form="props.form">
		<AppTeleport target="header-actions">
			<AppFormSubmitButton :form="props.form">
				{{ t('form.save_changes') }}
			</AppFormSubmitButton>
		</AppTeleport>

		<UsersFormName
			:first-name="firstName"
			:last-name="lastName"
		/>
	</AppForm>
</template>
