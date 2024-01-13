<script setup lang="ts">
import { FocusTrap } from 'focus-trap-vue'

interface Props {
	/**
	 * Indicates whether the focus trap is currently active or inactive.
	 * If active, the focus will be trapped inside the component.
	 * If inactive, the focus will not be trapped.
	 */
	disableFocusTrap?: boolean
}

const { disableFocusTrap = false } = defineProps<Props>()

onErrorCaptured((err) => {
	console.error(err)
})
</script>

<template>
	<Teleport to="body">
		<FocusTrap :active="!disableFocusTrap">
			<div>
				<slot />
			</div>
		</FocusTrap>
	</Teleport>
</template>
