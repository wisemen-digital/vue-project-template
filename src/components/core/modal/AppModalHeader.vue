<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import { useModalContext } from '@/composables/core/modal/useModalContext'
import { twMerge } from '@/utils/core//tailwind/twMerge'

interface Props {
	/**
	 * Determines if there is a close button on the modal.
	 */
	hideCloseButton?: boolean

	/**
	 * The class to be applied to the modal header.
	 */
	class?: string
}

const props = defineProps<Props>()
const { close } = useModalContext()

function handleClickCloseButton(): void {
	close()
}
</script>

<template>
	<div :class="twMerge('flex justify-between gap-4 p-4', props.class)">
		<DialogTitle>
			<slot />
		</DialogTitle>
		<div v-if="!hideCloseButton">
			<button @click="handleClickCloseButton">
				<AppIcon icon="close" />
			</button>
		</div>
	</div>
</template>
