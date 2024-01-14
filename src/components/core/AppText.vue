<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import { twMerge } from '@/libs/twMerge.lib'

interface Props {
	variant: 'body' | 'caption' | 'heading' | 'hero' | 'subtext' | 'subtitle' | 'title'
	as?: string
}

const { as, variant } = defineProps<Props>()

const attrs = useAttrs()

const classes = computed<string>(() => {
	const classes: string[] = []

	switch (variant) {
		case 'hero':
			classes.push('text-hero font-bold')
			break

		case 'title':
			classes.push('text-title font-bold')
			break

		case 'subtitle':
			classes.push('text-subtitle')
			break

		case 'heading':
			classes.push('text-heading')
			break

		case 'body':
			classes.push('text-body')
			break

		case 'subtext':
			classes.push('text-subtext')
			break

		case 'caption':
			classes.push('text-caption')
			break
	}

	return classes.join(' ')
})

const component = computed<string>(() => {
	if (as != null) {
		return as
	}

	switch (variant) {
		case 'hero':
		case 'title':
			return 'h1'

		case 'subtitle':
			return 'h2'

		case 'heading':
			return 'h3'

		default:
			return 'p'
	}
})
</script>

<template>
	<Component
		:is="component"
		:class="twMerge(classes, 'text-muted-foreground', attrs.class as string)"
	>
		<slot />
	</Component>
</template>
