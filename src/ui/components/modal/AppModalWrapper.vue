<script setup lang="ts">
import { FocusTrap } from 'focus-trap-vue'
import { onErrorCaptured } from 'vue'

import { logError } from '@/utils/logger.util.ts'

const { disableFocusTrap = false } = defineProps<{
	/**
	 * Indicates whether the focus trap is currently active or inactive.
	 * If active, the focus will be trapped inside the component.
	 * If inactive, the focus will not be trapped.
	 */
	disableFocusTrap?: boolean
}>()

onErrorCaptured((err) => {
	logError(err)
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
