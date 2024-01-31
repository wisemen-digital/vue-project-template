import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const sizeOptions = {
	default: 'h-6',
	sm: 'h-4',
	lg: 'h-8',
	full: 'h-full',
}

export const iconVariants = cva({
	base: null,
	variants: {
		size: sizeOptions,
	},
	defaultVariants: {
		size: 'default',
	},
})

export type IconProps = VariantProps<typeof iconVariants>

export const iconSizeOptions = Object.keys(sizeOptions)
