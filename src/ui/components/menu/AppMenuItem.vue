<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'

import type { Icon } from '@/icons/icon.type.ts'

const {
	isDanger = false,
	isDisabled = false,
	icon,
} = defineProps<{
	isDanger?: boolean
	icon?: Icon
	isDisabled?: boolean
}>()

const emit = defineEmits<{ (event: 'action'): void }>()
</script>

<template>
	<MenuItem
		v-slot="{ active, close }"
		as="template"
		:disabled="isDisabled"
	>
		<button
			:class="{
				'cursor-not-allowed opacity-50': isDisabled,
			}"
			:disabled="isDisabled"
			type="button"
			@click.prevent="
				emit('action')
				close()
			"
		>
			<div
				class="flex items-center justify-between gap-x-3 px-3 py-2"
				:class="{
					'bg-neutral-100': active,
				}"
				type="button"
			>
				<AppText
					:class="{
						'text-destructive': isDanger,
					}"
					variant="subtext"
				>
					<slot />
				</AppText>

				<AppIcon
					v-if="icon != null"
					class="w-4"
					:class="{
						'text-destructive': isDanger,
					}"
					:icon="icon"
				/>
			</div>
		</button>
	</MenuItem>
</template>
