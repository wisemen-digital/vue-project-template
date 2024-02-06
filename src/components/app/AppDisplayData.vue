<script setup lang="ts">
import AppText from '@/components/core/text/AppText.vue'

type Props = {
	label: string
	value: string
}

const { label, value } = defineProps<Props>()
</script>

<template>
	<div>
		<AppText variant="subtext">
			{{ label }}
		</AppText>
		<AppText variant="caption">
			{{ value }}
		</AppText>
	</div>
</template>
