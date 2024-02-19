<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppDivider from '@/components/app/AppDivider.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppModal from '@/components/core/modal/AppModal.vue'
import AppText from '@/components/core/text/AppText.vue'

const { t } = useI18n()

const { isOpen, title, description } = defineProps<{
	isOpen: boolean
	title: string
	description: string
}>()

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
		<div class="max-w-md">
			<div class="space-y-2 p-4">
				<AppText
					class="font-medium"
					variant="body"
				>
					{{ title }}
				</AppText>
				<AppText variant="body">
					{{ description }}
				</AppText>
			</div>
			<AppDivider direction="horizontal" />
			<div class="flex items-center justify-end border border-t border-border p-4">
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
		</div>
	</AppModal>
</template>
