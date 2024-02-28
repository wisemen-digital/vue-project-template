<script setup lang="ts">
import AppText from '@/components/app/text/AppText.vue'

const props = defineProps<{
	label: string
	value: string
}>()
</script>

<template>
	<div>
		<AppText variant="subtext">
			{{ props.label }}
		</AppText>
		<AppText variant="caption">
			{{ props.value }}
		</AppText>
	</div>
</template>
