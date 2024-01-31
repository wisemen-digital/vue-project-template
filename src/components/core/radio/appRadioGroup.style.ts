import type { VariantProps } from '@/utils/core/tailwind/cva'
import { cva } from '@/utils/core/tailwind/cva'

export const radioGroupIndicatorContainerVariants = cva({
	base: 'relative flex h-6 w-6 flex-none cursor-pointer items-center justify-center rounded-full border bg-background',
	variants: {
		isInvalid: {
			true: 'border-destructive',
			false: 'border-border',
		},
	},
	defaultVariants: {
		isInvalid: false,
	},
})

export const radioGroupIndicatorVariants = cva({
	base: 'absolute rounded-full bg-primary duration-200',
	variants: {
		isChecked: {
			true: 'h-3 w-3',
			false: 'h-0 w-0',
		},
	},
	defaultVariants: {
		isChecked: false,
	},
})

export const radioGroupOptionText = cva({
	base: '',
	variants: {
		isInvalid: {
			true: 'text-destructive',
			false: 'text-foreground',
		},
	},
	defaultVariants: {
		isInvalid: false,
	},
})

export type RadioGroupIndicatorContainerProps = VariantProps<typeof radioGroupIndicatorContainerVariants>
export type RadioGroupIndicatorProps = VariantProps<typeof radioGroupIndicatorVariants>
export type RadioGroupOptionTextProps = VariantProps<typeof radioGroupOptionText>
