<script setup lang="ts">
import { computed } from 'vue'

import { useIsMounted } from '@/composables/core/is-mounted/isMounted.composable'

type TeleportTarget = 'body'

const { target } = defineProps<{
	target: TeleportTarget
}>()

const targetMap = new Map<TeleportTarget, string>([['body', 'body']])

const isMounted = useIsMounted()

const teleportTarget = computed<string>(() => {
	const selectedTarget = targetMap.get(target) ?? null

	if (selectedTarget === null) {
		throw new Error(`Invalid teleport target: ${target}`)
	}

	return selectedTarget
})
</script>

<template>
	<Teleport
		v-if="isMounted"
		:to="teleportTarget"
	>
		<slot />
	</Teleport>
</template>
