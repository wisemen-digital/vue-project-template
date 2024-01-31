import { cva } from '@/libs/cva.lib'

export const switchWrapper = cva({
	base: 'transition duration-200',
	variants: {
		isCheckbox: {
			true: 'flex h-6 w-6 items-center justify-center rounded-input border border-border bg-neutral-200',
			false:
				'relative inline-flex h-6 w-10 items-center rounded-full border bg-white ring-primary ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
		},
		isDisabled: {
			true: 'cursor-not-allowed bg-input-disabled opacity-50',
		},
		isInvalid: {
			true: 'border-destructive text-destructive focus-visible:ring-destructive',
		},
	},
})

export const switchElement = cva({
	base: 'h-4 w-4 rounded-full bg-input-disabled',
	variants: {
		isCheckbox: {
			true: 'h-4 w-4',
			false: 'bg-input-disabled opacity-50',
		},
		isInvalid: {
			true: '!border-destructive text-destructive focus-visible:ring-destructive',
		},
	},
})
