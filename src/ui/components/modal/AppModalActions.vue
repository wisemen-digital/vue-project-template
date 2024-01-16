<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
	primaryAction?: string
	isPrimaryActionDestructive?: boolean
	isLoading?: boolean
}

const { primaryAction, isLoading = false, isPrimaryActionDestructive = false } = defineProps<Props>()

const emit = defineEmits<{
	(event: 'action:cancel'): void
	(event: 'action:primary'): void
}>()

const { t } = useI18n()

function onCancel(): void {
	emit('action:cancel')
}

function onPrimaryAction(): void {
	emit('action:primary')
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
