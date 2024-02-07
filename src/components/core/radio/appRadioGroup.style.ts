import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const radioGroupIndicatorContainerVariants = cva({
	base: 'relative flex size-6 flex-none cursor-pointer items-center justify-center rounded-full border bg-background',
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
			true: 'size-3',
			false: 'size-0',
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
