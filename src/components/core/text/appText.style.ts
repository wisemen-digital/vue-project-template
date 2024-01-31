import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const variantOptions = {
	hero: 'text-hero',
	title: 'text-title',
	subtitle: 'text-subtitle',
	heading: 'text-heading',
	body: 'text-body',
	subtext: 'text-subtext',
	caption: 'text-caption',
}

export const truncateOptions = {
	1: 'line-clamp-1',
	2: 'line-clamp-2',
	3: 'line-clamp-3',
	4: 'line-clamp-4',
	5: 'line-clamp-5',
	6: 'line-clamp-6',
}

export const textVariants = cva({
	base: null,
	variants: {
		variant: variantOptions,
		truncate: truncateOptions,
	},
	defaultVariants: {
		variant: 'body',
		truncate: undefined,
	},
})

export type TextProps = VariantProps<typeof textVariants>

export const textVariantOptions = Object.keys(variantOptions)
export const textTruncateOptions = Object.keys(truncateOptions)
