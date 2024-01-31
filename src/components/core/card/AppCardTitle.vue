<script setup lang="ts">
import AppText from '@/components/core/text/AppText.vue'
</script>

<template>
	<AppText
		boldness="semibold"
		variant="heading"
	>
		<slot />
	</AppText>
</template>
