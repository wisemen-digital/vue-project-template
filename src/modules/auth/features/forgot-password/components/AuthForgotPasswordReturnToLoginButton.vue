<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppText from '@/components/core/text/AppText.vue'

const { t } = useI18n()
</script>

<template>
	<div class="space-y-4">
		<AppText variant="title">
			{{ t('auth.check_your_email') }}
		</AppText>
		<AppText>
			{{ t('auth.check_your_email_description') }}
		</AppText>
	</div>
</template>
