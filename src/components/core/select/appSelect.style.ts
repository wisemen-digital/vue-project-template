import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const variantOptions = {
	default: 'bg-popover text-popover-foreground',
	disabled: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-focus-destructive',
}

export const active = {
	true: 'text-secondary-foreground bg-primary/10',
}

export const selected = {
	true: 'text-primary',
}

export const appSelectOptionVariants = cva({
	base: 'flex w-full gap-2 hover:bg-primary/20 rounded border border-transparent bg-white p-2 text-left text-black transition-all',
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
