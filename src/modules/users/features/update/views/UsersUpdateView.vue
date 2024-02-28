<script setup lang="ts">
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import { useHandleApiError } from '@/composables/handle-api-error/handleApiError.composable'
import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import type { User } from '@/models/users/detail/user.model'
import type { UserUpdateForm } from '@/models/users/update/userUpdateForm.model'
import { userUpdateFormSchema } from '@/models/users/update/userUpdateForm.model'
import { transformUserToUpdateUserForm } from '@/models/users/user.transformer'
import { useUserUpdateMutation } from '@/modules/users/api/mutations/userUpdate.mutation'
import type { Breadcrumb } from '@/types/breadcrumb.type'

import UsersUpdateForm from '../components/UsersUpdateForm.vue'

const props = defineProps<{
	user: User
}>()

const router = useTypedRouter()
const { t } = useI18n()
const { execute: userUpdateMutation } = useUserUpdateMutation()

const breadcrumbs: Breadcrumb[] = [
	{
		label: t('shared.users'),
		to: {
			name: 'users-overview',
		},
	},
	{
		label: props.user.fullName,
		to: {
			name: 'users-detail',
			params: {
				userUuid: props.user.uuid,
			},
		},
	},
	{
		label: t('shared.edit'),
	},
]

const { form, onSubmitForm } = useForm({
	schema: userUpdateFormSchema,
	initialState: computed<UserUpdateForm>(() => transformUserToUpdateUserForm(props.user)),
})

onSubmitForm(async (values) => {
	try {
		await userUpdateMutation({
			params: {
				userUuid: props.user.uuid,
			},
			body: values,
		})

		await router.push({
			name: 'users-detail',
			params: {
				userUuid: props.user.uuid,
			},
		})
	} catch (error) {
		useHandleApiError(error, form)
	}
})
</script>

<template>
	<AppPage
		:breadcrumbs="breadcrumbs"
		:title="props.user.fullName"
	>
		<UsersUpdateForm :form="form" />
	</AppPage>
</template>
