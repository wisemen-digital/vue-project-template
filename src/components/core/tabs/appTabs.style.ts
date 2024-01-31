import type { VariantProps } from '@/utils/core/tailwind/cva'
import { cva } from '@/utils/core/tailwind/cva'

export const tabVariants = cva({
	base: 'rounded-t-button border border-transparent border-b-neutral-200  px-4 py-2 text-foreground outline-none duration-100 first-letter:rounded-t-button focus-visible:border-primary',
	variants: {},
})

export type TabProps = VariantProps<typeof tabVariants>
