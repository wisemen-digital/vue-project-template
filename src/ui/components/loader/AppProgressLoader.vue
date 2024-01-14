<script setup lang="ts">
interface Props {
	progressPercentage: number
}

const { progressPercentage } = defineProps<Props>()

const minDasharray = 1
const maxDasharray = 130

function lerp(a: number, b: number, n: number): number {
	return a + n * (b - a)
}

const dasharray = computed<number>(() => lerp(minDasharray, maxDasharray, progressPercentage / 100))
</script>

<template>
	<div class="h-5 w-5">
		<svg
			class="relative h-full w-full"
			viewBox="0 0 50 50"
		>
			<circle
				class="absolute stroke-neutral-200"
				cx="25"
				cy="25"
				fill="none"
				r="20"
				stroke-width="3"
				:style="{
					strokeLinecap: 'round',
					strokeDashoffset: 0,
					strokeDasharray: `130, 150`,
				}"
			/>

			<circle
				class="stroke-neutral-600 duration-100 ease-linear"
				cx="25"
				cy="25"
				fill="none"
				r="20"
				stroke-width="3"
				:style="{
					strokeLinecap: 'round',
					strokeDashoffset: 0,
					strokeDasharray: `${dasharray}, 150`,
				}"
			/>
		</svg>
	</div>
</template>
