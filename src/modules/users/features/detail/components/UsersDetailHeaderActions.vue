<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/app/button/AppButton.vue'
import type { UserUuid } from '@/models/users/userUuid.model'

const props = defineProps<{
	userUuid: UserUuid
}>()

const { t } = useI18n()
</script>

<template>
	<AppButton
		:to="{
			name: 'users-update',
			params: {
				userUuid: props.userUuid,
			},
		}"
	>
		{{ t('users.detail.edit_user') }}
	</AppButton>
</template>
