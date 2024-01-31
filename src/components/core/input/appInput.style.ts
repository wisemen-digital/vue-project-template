import { cva } from '@/libs/cva.lib'

export const inputWrapper = cva({
	base: 'relative flex w-full items-center rounded-input border border-solid border-input-border bg-background shadow-input-shadow ring-offset-background duration-100',
	variants: {
		isDisabled: {
			true: 'cursor-not-allowed bg-input-disabled opacity-50',
		},
		isFocused: {
			true: 'border-primary ring-2 ring-primary ring-offset-2',
		},
		isInvalid: {
			true: 'border-destructive text-destructive ring-destructive',
		},
		isCompact: {
			true: 'h-8',
			false: 'h-10',
		},
	},
	defaultVariants: {
		isCompact: false,
	},
})

export const input = cva({
	base: 'h-full w-full truncate bg-transparent px-3 py-2 text-subtext text-input-foreground outline-none placeholder:text-input-foreground/50 placeholder:transition-all placeholder:duration-300 focus:placeholder:translate-x-1 focus:placeholder:opacity-0 disabled:cursor-not-allowed',
	variants: {
		isReadonly: {
			true: 'focus:placeholder:translate-x-0 focus:placeholder:opacity-100',
		},
		isSelect: {
			true: 'focus:placeholder:translate-x-0 focus:placeholder:opacity-100',
		},
	},
})

export const inputIcon = cva({
	base: 'h-3.5 w-3.5 text-input-foreground',
	variants: {
		isInvalid: {
			true: 'text-destructive',
		},
	},
})
