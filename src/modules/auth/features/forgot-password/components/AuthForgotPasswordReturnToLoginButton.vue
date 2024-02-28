<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppText from '@/components/app/text/AppText.vue'

const { t } = useI18n()
</script>

<template>
	<div class="space-y-4">
		<AppText variant="title">
			{{ t('auth.check_your_email') }}
		</AppText>

		<AppText variant="body">
			{{ t('auth.check_your_email_description') }}
		</AppText>
	</div>
</template>
