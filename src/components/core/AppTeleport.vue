<script setup lang="ts">
import { computed } from 'vue'

import { useIsMounted } from '@/composables/core/isMounted.composable'
import { toComputedRefs } from '@/utils/toComputedRefs.util'

type TeleportTarget = 'body'

interface Props {
	target: TeleportTarget
}

const props = defineProps<Props>()

const { target } = toComputedRefs(props)

const targetMap = new Map<TeleportTarget, string>([['body', 'body']])

const isMounted = useIsMounted()

const teleportTarget = computed<string>(() => {
	const selectedTarget = targetMap.get(target.value) ?? null

	if (selectedTarget === null) {
		throw new Error(`Invalid teleport target: ${target.value}`)
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
