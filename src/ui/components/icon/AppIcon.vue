<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { shallowRef, watch } from 'vue'

import { type Icon, icons } from '@/icons/icon.type'

interface Props {
	icon: Icon
	size?: 'lg' | 'md' | 'sm'
}

const { icon, size } = defineProps<Props>()
const svgComponent = shallowRef<Component | null>(null)

const styleClass = computed<string>(() => {
	switch (size) {
		case 'lg':
			return 'w-6 h-6'
		case 'md':
			return 'w-5 h-5'
		case 'sm':
			return 'w-4 h-4'
		default:
			return 'w-5 h-5'
	}
})

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
		:class="styleClass"
	/>
</template>
