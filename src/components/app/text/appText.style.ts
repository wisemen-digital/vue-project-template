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

export const textVariants = cva({
	base: null,
	variants: {
		variant: variantOptions,
	},
	defaultVariants: {
		variant: 'body',
	},
})

export type TextProps = VariantProps<typeof textVariants>

export const textVariantOptions = Object.keys(variantOptions)
