<script setup lang="ts">
import { SwitchDescription } from '@headlessui/vue'

import AppText from '@/components/core/text/AppText.vue'

interface Props {
	/**
	 * The description of the switch.
	 */
	description: string | null
}
defineProps<Props>()
</script>

<template>
	<SwitchDescription>
		<AppText
			class="mt-1"
			variant="caption"
		>
			{{ description }}
		</AppText>
	</SwitchDescription>
</template>
