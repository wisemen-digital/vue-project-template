<script setup lang="ts">
import AppFocusable from '@/components/app/focusable/AppFocusable.vue'
import { useModal } from '@/composables/modal/modal.composable.ts'

const props = withDefaults(
	defineProps<{
		src: string
		alt?: string | null
		disableEnlargeOnClick?: boolean
	}>(),
	{
		alt: null,
		disableEnlargeOnClick: false,
	}
)

const { modalId, openModal } = useModal({
	component: () => import('../image/AppImageModal.vue'),
})

function onClick(): void {
	if (props.disableEnlargeOnClick) {
		return
	}

	openModal({
		src: props.src,
		alt: props.alt,
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
			:alt="props.alt ?? undefined"
			class="rounded"
			:src="props.src"
		/>
	</Component>
</template>
