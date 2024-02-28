import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const sizeOptions = {
	default: 'h-4 w-4',
	xs: 'h-2 w-2',
	sm: 'h-3 w-3',
	lg: 'h-5 w-5',
	xl: 'h-6 w-6',
	xxl: 'h-8 w-8',
	full: 'h-full w-full',
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
