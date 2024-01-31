<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef, watch } from 'vue'

import { type Icon, icons } from '@/icons/icon.type'

const { icon } = defineProps<{
	icon: Icon
}>()

const svgComponent = shallowRef<Component | null>(null)

watch(
	() => icon,
	async () => {
		const resolvedComponent = await icons[icon]
		svgComponent.value = resolvedComponent.default
	},
	{
		immediate: true,
	}
)
</script>

<template>
	<Component
		:is="svgComponent"
		v-if="svgComponent !== null"
	/>
</template>
