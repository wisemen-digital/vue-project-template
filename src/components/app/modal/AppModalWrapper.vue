<script setup lang="ts">
import { FocusTrap } from 'focus-trap-vue'
import { onErrorCaptured } from 'vue'

import { logError } from '@/utils/logger.util.ts'

const props = withDefaults(
	defineProps<{
		disableFocusTrap?: boolean
	}>(),
	{
		disableFocusTrap: false,
	}
)

onErrorCaptured((err) => {
	logError(err)
})
</script>

<template>
	<Teleport to="body">
		<FocusTrap :active="!props.disableFocusTrap">
			<div>
				<slot />
			</div>
		</FocusTrap>
	</Teleport>
</template>
