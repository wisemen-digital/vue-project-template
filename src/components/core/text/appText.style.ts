import type { VariantProps } from '@/utils/core/tailwind/cva'
import { cva } from '@/utils/core/tailwind/cva'

export const variantOptions = {
	hero: 'text-hero',
	title: 'text-title',
	subtitle: 'text-subtitle',
	heading: 'text-heading',
	body: 'text-body',
	subtext: 'text-subtext',
	caption: 'text-caption',
}

export const boldnessOptions = {
	bold: 'font-bold',
	normal: 'font-normal',
	light: 'font-light',
	thin: 'font-thin',
	extrabold: 'font-extrabold',
	semibold: 'font-semibold',
	none: null,
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
		boldness: boldnessOptions,
		truncate: truncateOptions,
	},
	defaultVariants: {
		variant: 'body',
		boldness: 'none',
		truncate: undefined,
	},
})

export type TextProps = VariantProps<typeof textVariants>

export const textVariantOptions = Object.keys(variantOptions)
export const textBoldnessOptions = Object.keys(boldnessOptions)
export const textTruncateOptions = Object.keys(truncateOptions)
