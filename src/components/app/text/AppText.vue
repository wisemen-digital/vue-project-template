<script setup lang="ts">
import { computed, useAttrs } from 'vue'

import type { TextProps } from '@/components/app/text/appText.style'
import { textVariants } from '@/components/app/text/appText.style'

type TextType = 'blockquote' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

const props = withDefaults(
	defineProps<{
		variant: TextProps['variant']
		as?: TextType
	}>(),
	{
		as: 'p',
	}
)

const classes = computed<string>(() => {
	const classes: string[] = []

	switch (props.variant) {
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
		:class="
			textVariants({
				variant: props.variant,
				class: [classes, attrs.class],
			})
		"
	>
		<slot />
	</Component>
</template>
