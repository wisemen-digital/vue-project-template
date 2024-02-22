<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import type { User } from '@/models/users/detail/user.model'
import type { Breadcrumb } from '@/types/breadcrumb.type'

import UsersDetailHeaderActions from '../components/UsersDetailHeaderActions.vue'

const props = defineProps<{
	user: User
}>()

const { t } = useI18n()

const breadcrumbs: Breadcrumb[] = [
	{
		label: t('shared.users'),
		to: {
			name: 'users-overview',
		},
	},
	{
		label: props.user.fullName,
	},
]
</script>

<template>
	<AppPage
		:breadcrumbs="breadcrumbs"
		:title="props.user.fullName"
	>
		<template #header-actions>
			<UsersDetailHeaderActions :user-uuid="props.user.uuid" />
		</template>
	</AppPage>
</template>
