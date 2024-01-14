<script setup lang="ts">
import { type Icon, icons } from '@/icons'

interface Props {
	icon: Icon
}

const { icon } = defineProps<Props>()

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
