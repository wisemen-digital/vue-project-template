<script setup lang="ts">
import AppButton from '@/components/core/button/AppButton.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppText from '@/components/core/text/AppText.vue'
import type { Icon } from '@/icons/icons'

const { title, icon } = defineProps<{
	title: string
	icon: Icon
}>()

const emit = defineEmits<{ (event: 'close'): void }>()

function onCloseModal(): void {
	emit('close')
}
</script>

<template>
	<div class="flex items-center justify-between px-6 py-4">
		<div class="flex items-center gap-x-2">
			<div class="rounded-md border border-solid border-border p-2">
				<AppIcon
					class="size-4"
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
			class="size-8"
			icon-left="close"
			size="icon"
			variant="secondary"
			@click="onCloseModal"
		/>
	</div>
</template>
