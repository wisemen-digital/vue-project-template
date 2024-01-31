<script setup lang="ts">
import AppFocusable from '@/components/core/AppFocusable.vue'
import { useModal } from '@/ui/composables/useModal.ts'

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
	component: () => import('./AppImageModal.vue'),
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
