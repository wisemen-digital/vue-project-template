import type { VariantProps } from 'cva'

import { cva } from '@/libs/cva.lib'

export const toast = cva({
	base: 'flex items-center justify-between gap-2 bg-background px-3 py-2 text-foreground',
	variants: {
		variant: {
			warn: 'text-warn',
			error: 'text-destructive',
			info: 'text-info',
			success: 'text-success',
			default: 'text-foreground',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export const toastIcon = cva({
	base: 'size-4',
	variants: {
		variant: {
			warn: 'text-warn',
			error: 'text-destructive',
			info: 'text-info',
			success: 'text-success',
			default: 'text-foreground',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export const toastContainer = cva({
	base: 'w-80 overflow-hidden rounded-lg border border-solid bg-white shadow-modal-shadow',
	variants: {
		variant: {
			warn: 'border-warn',
			error: 'border-destructive',
			info: 'border-info',
			success: 'border-success',
			default: 'border-border',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export type Toast = VariantProps<typeof toast>
export type ToastContainer = VariantProps<typeof toastContainer>
