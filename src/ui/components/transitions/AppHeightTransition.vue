<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	duration?: number
}

const { duration = 500 } = defineProps<Props>()

const heightTransition = computed<string>(() => `${duration}ms`)

function handleEnter(el: Element): void {
	const element = el as HTMLElement

	const { width } = getComputedStyle(element)

	element.style.width = width
	element.style.position = 'absolute'
	element.style.visibility = 'hidden'
	element.style.height = 'auto'

	const { height } = getComputedStyle(element)

	element.style.width = ''
	element.style.position = ''
	element.style.visibility = ''
	element.style.height = '0'

	// eslint-disable-next-line no-unused-expressions,@typescript-eslint/no-unused-expressions
	getComputedStyle(element).height

	requestAnimationFrame(() => {
		element.style.height = height
	})
}

function handleAfterEnter(el: Element): void {
	const element = el as HTMLElement

	element.style.height = 'auto'
}

function handleLeave(el: Element): void {
	const element = el as HTMLElement

	const { height } = getComputedStyle(element)

	element.style.height = height

	// eslint-disable-next-line no-unused-expressions,@typescript-eslint/no-unused-expressions
	getComputedStyle(element).height

	requestAnimationFrame(() => {
		element.style.height = '0'
	})
}
</script>

<template>
	<Transition
		enter-from-class="opacity-0"
		leave-to-class="opacity-0"
		name="height"
		@after-enter="handleAfterEnter"
		@enter="handleEnter"
		@leave="handleLeave"
	>
		<slot />
	</Transition>
</template>

<style scoped lang="scss">
* {
	will-change: height;
	transform: translateZ(0);
	backface-visibility: hidden;
	perspective: 1000px;
}

.height {
	&-enter-active,
	&-leave-active {
		transition: v-bind(heightTransition);
		overflow: hidden;
	}

	&-enter-from,
	&-leave-to {
		height: 0;
		transform: translateX(100%) !important;
	}
}
</style>
