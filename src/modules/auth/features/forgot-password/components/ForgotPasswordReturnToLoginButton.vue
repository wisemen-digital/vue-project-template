<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<AppButton
		class="w-full"
		:to="{
			name: 'login-form',
		}"
	>
		{{ t('auth.features.return_to_login') }}
	</AppButton>
</template>
