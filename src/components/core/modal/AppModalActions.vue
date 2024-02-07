<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '../button/AppButton.vue'

const {
	primaryAction,
	isLoading = false,
	isPrimaryActionDestructive = false,
} = defineProps<{
	primaryAction?: string
	isPrimaryActionDestructive?: boolean
	isLoading?: boolean
}>()

const emit = defineEmits<{
	(event: 'cancel'): void
	(event: 'primary'): void
}>()

const { t } = useI18n()

function onCancel(): void {
	emit('cancel')
}

function onPrimaryAction(): void {
	emit('primary')
}
</script>

<template>
	<div class="flex items-center justify-end gap-x-2 px-6 py-4">
		<slot>
			<AppButton
				:is-disabled="isLoading"
				variant="outline"
				@click="onCancel"
			>
				{{ t('modal.cancel') }}
			</AppButton>

			<AppButton
				:is-loading="isLoading"
				:variant="isPrimaryActionDestructive ? 'destructive' : 'default'"
				@click="onPrimaryAction"
			>
				{{ primaryAction }}
			</AppButton>
		</slot>
	</div>
</template>
