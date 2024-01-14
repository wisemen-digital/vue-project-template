<script setup lang="ts">
interface Props {
	as?: Record<string, unknown> | string
}

const { as = 'button' } = defineProps<Props>()
</script>

<template>
	<Component
		:is="as"
		class="rounded text-left ring-primary ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
		type="button"
	>
		<slot />
	</Component>
</template>
