<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/core/button/AppButton.vue'

const { t } = useI18n()
</script>

<template>
	<AppButton
		class="w-full"
		:to="{
			name: 'login',
		}"
	>
		{{ t('auth.forgot_password.return_to_login') }}
	</AppButton>
</template>
