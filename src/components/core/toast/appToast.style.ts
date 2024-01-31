import type { VariantProps } from '@/utils/core/tailwind/cva'
import { cva } from '@/utils/core/tailwind/cva'

export const variantOptions = {
	warn: 'bg-warn/20 text-warn',
	error: 'bg-destructive/20 text-destructive',
	info: 'bg-info/20 text-info',
	success: 'bg-success/20 text-success',
	default: 'bg-background text-foreground',
}

export const containerVariantOptions = {
	warn: 'border-warn',
	error: 'border-destructive',
	info: 'border-info',
	success: 'border-success',
	default: 'border-border',
}

export const toast = cva({
	base: 'flex items-center justify-between gap-2 px-2 py-1',
	variants: {
		variant: variantOptions,
	},
	defaultVariants: {
		variant: 'default',
	},
})

export const toastContainer = cva({
	base: 'w-full overflow-hidden rounded border bg-white shadow-card-shadow lg:w-80',
	variants: {
		variant: containerVariantOptions,
	},
	defaultVariants: {
		variant: 'default',
	},
})

export type ToastProps = VariantProps<typeof toast>
export type ToastContainerProps = VariantProps<typeof toastContainer>
