import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const tabVariants = cva({
	base: 'rounded-t-button border border-transparent hover:bg-muted-background border-b-neutral-200 px-4 py-2 text-foreground outline-none duration-100 first-letter:rounded-t-button focus-visible:border-primary',
	variants: {},
})

export type TabProps = VariantProps<typeof tabVariants>
