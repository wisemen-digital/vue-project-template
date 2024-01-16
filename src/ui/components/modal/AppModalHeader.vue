<script setup lang="ts">
import type { Icon } from '@/icons/icon.type.ts'

interface Props {
	title: string
	icon: Icon
}

const { title, icon } = defineProps<Props>()

const emit = defineEmits<{ (event: 'action:close'): void }>()

function onCloseModal(): void {
	emit('action:close')
}
</script>

<template>
	<div class="flex items-center justify-between px-6 py-4">
		<div class="flex items-center gap-x-2">
			<div class="rounded-md border border-solid border-border p-2">
				<AppIcon
					class="h-4 w-4"
					:icon="icon"
				/>
			</div>

			<AppText
				class="font-medium"
				variant="heading"
			>
				{{ title }}
			</AppText>
		</div>

		<AppButton
			class="h-8 w-8"
			icon-left="close"
			size="icon"
			variant="secondary"
			@click="onCloseModal"
		/>
	</div>
</template>
