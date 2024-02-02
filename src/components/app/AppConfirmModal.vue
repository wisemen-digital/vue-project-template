<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/core/button/AppButton.vue'
import AppModal from '@/components/core/modal/AppModal.vue'
import AppText from '@/components/core/text/AppText.vue'

type Props = {
	isOpen: boolean
	title: string
	description: string
}
const { t } = useI18n()

defineProps<Props>()

const emit = defineEmits<{
	close: []
	confirm: []
}>()

function onCloseButtonClick(): void {
	emit('close')
}

function onCancelButtonClick(): void {
	emit('close')
}

function onConfirmButtonClick(): void {
	emit('confirm')
}
</script>

<template>
	<AppModal
		:is-open="isOpen"
		@close="onCloseButtonClick"
	>
		<AppText variant="heading">
			{{ title }}
		</AppText>
		<AppText variant="body">
			{{ description }}
		</AppText>
		<div class="flex items-center justify-end">
			<AppButton
				variant="secondary"
				@click="onCancelButtonClick"
			>
				{{ t('shared.cancel') }}
			</AppButton>
			<AppButton @click="onConfirmButtonClick">
				{{ t('shared.confirm') }}
			</AppButton>
		</div>
	</AppModal>
</template>
