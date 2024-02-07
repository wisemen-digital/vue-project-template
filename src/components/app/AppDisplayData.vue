<script setup lang="ts">
import AppText from '@/components/core/text/AppText.vue'

const { label, value } = defineProps<{
	label: string
	value: string
}>()
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
