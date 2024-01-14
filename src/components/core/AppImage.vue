<script setup lang="ts">
import AppFocusable from '@/components/core/AppFocusable.vue'
import { useModal } from '@/ui/composables'

interface Props {
	src: string
	alt?: string | null
	disableEnlargeOnClick?: boolean
}

const { src, alt = null, disableEnlargeOnClick = false } = defineProps<Props>()

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
