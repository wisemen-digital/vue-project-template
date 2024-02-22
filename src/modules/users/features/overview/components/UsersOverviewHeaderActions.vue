<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/app/button/AppButton.vue'

const { t } = useI18n()
</script>

<template>
	<AppButton
		:to="{
			name: 'users-create',
		}"
	>
		{{ t('users.overview.new_user') }}
	</AppButton>
</template>
