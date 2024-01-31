import { cva } from '@/utils/core/tailwind/cva'

export const formLabel = cva({
	base: 'text-subtext text-muted-foreground',
	variants: {
		isInvalid: {
			true: 'text-destructive',
		},
		isDisabled: {
			true: 'opacity-50',
		},
	},
})
