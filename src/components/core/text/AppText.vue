<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import type { TextProps } from '@/components/core/text/appText.style'
import { textVariants } from '@/components/core/text/appText.style'

type TextType = 'blockquote' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface Props {
	/**
	 * The variant of the text.
	 */
	variant?: TextProps['variant']

	/**
	 * The number of lines to truncate the text.
	 */
	numberOfLines?: TextProps['truncate']

	/**
	 * The HTML tag to use for the text.
	 */
	as?: TextType
}

const { variant = 'body', numberOfLines, as = 'p' } = defineProps<Props>()

const classes = computed<string>(() => {
	const classes: string[] = []

	switch (variant) {
		case 'hero':
			classes.push('text-hero font-bold')
			break

		case 'title':
			classes.push('text-title font-semibold text-foreground')
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
const attrs = useAttrs()
</script>

<template>
	<Component
		:is="as"
		:class="textVariants({ variant, truncate: numberOfLines, class: [classes, attrs.class] })"
	>
		<slot />
	</Component>
</template>
