<script setup lang="ts">
import { useAttrs } from 'vue'

import type { TextProps } from '@/components/core/text/appText.style'
import { textVariants } from '@/components/core/text/appText.style'

type TextType = 'blockquote' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

interface Props {
	/**
	 * The variant of the text.
	 */
	variant?: TextProps['variant']

	/**
	 * The boldness of the text.
	 */
	boldness?: TextProps['boldness']

	/**
	 * The number of lines to truncate the text.
	 */
	numberOfLines?: TextProps['truncate']

	/**
	 * The HTML tag to use for the text.
	 */
	as?: TextType
}

const { variant = 'body', numberOfLines, boldness, as = 'p' } = defineProps<Props>()

const attrs = useAttrs()
</script>

<template>
	<Component
		:is="as"
		:class="textVariants({ variant, boldness, truncate: numberOfLines, class: attrs?.class as string })"
	>
		<slot />
	</Component>
</template>
