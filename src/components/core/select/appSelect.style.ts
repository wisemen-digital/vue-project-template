import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const variantOptions = {
	default: 'bg-popover text-popover-foreground',
	disabled: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-focus-destructive',
}

export const active = {
	true: 'bg-secondary text-secondary-foreground bg-secondary/80',
}

export const selected = {
	true: 'text-primary underline-offset-4 underline hover:bg-secondary/80',
}

export const appSelectOptionVariants = cva({
	base: 'flex w-full gap-2 rounded border border-transparent bg-white px-2 py-1 text-left text-black transition-all',
	variants: {
		variant: variantOptions,
		active,
		selected,
	},
	defaultVariants: {
		variant: 'default',
	},
})

export type AppSelectOptionProps = VariantProps<typeof appSelectOptionVariants>
export const AppSelectOptionVariantOptions = Object.keys(variantOptions)
