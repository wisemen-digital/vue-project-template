<script setup lang="ts">
import AppFocusable from '@/components/core/focusable/AppFocusable.vue'
import { useModal } from '@/composables/core/modal/modal.composable.ts'

const {
	src,
	alt = null,
	disableEnlargeOnClick = false,
} = defineProps<{
	src: string
	alt?: string | null
	disableEnlargeOnClick?: boolean
}>()

const { modalId, openModal } = useModal({
	component: () => import('../image/AppImageModal.vue'),
})

function onClick(): void {
	if (disableEnlargeOnClick) {
		return
	}

	openModal({
		src,
		alt,
	})
}
</script>

<template>
	<Component
		:is="disableEnlargeOnClick ? 'div' : AppFocusable"
		:id="modalId"
		@click="onClick"
	>
		<img
			:alt="alt ?? undefined"
			class="rounded"
			:src="src"
		/>
	</Component>
</template>
