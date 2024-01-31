<script setup lang="ts">
import AppText from '@/components/core/text/AppText.vue'

interface Props {
	/**
	 * The main text.
	 */
	text?: string

	/**
	 * The subtext.
	 */
	description?: string
}

defineProps<Props>()
const slots = defineSlots<{
	description?: []
	default?: []
}>()
</script>

<template>
	<div class="text-left">
		<AppText variant="subtext">
			<slot>
				{{ text }}
			</slot>
		</AppText>
		<AppText
			v-if="description || slots.default"
			class="text-muted-foreground"
			variant="caption"
		>
			<slot name="description">
				{{ description }}
			</slot>
		</AppText>
	</div>
</template>
