<script setup lang="ts">
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
