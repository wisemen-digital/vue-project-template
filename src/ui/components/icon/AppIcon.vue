<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef, watch } from 'vue'

import type { Icon } from '@/icons/icon.type.ts'
import { getIcon } from '@/icons/icon.type.ts'

interface Props {
	icon: Icon
}

const { icon } = defineProps<Props>()

const svgComponent = shallowRef<Component | null>(null)

watch(
	() => icon,
	async () => {
		const resolvedComponent = await getIcon(icon)

		if (resolvedComponent === null) {
			return
		}

		svgComponent.value = resolvedComponent
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
