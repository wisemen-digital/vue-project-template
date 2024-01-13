import { cva } from '@/libs/cva.lib'

export const textarea = cva({
	base: 'w-full rounded-input border border-solid border-input-border bg-background p-3 text-subtext shadow-input-shadow ring-offset-background transition duration-100 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed',
	variants: {
		isDisabled: {
			true: 'bg-input-disabled opacity-50',
		},
		isInvalid: {
			true: '!border-destructive text-destructive focus-visible:ring-destructive',
		},
	},
})
