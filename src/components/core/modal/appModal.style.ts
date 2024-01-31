import type { VariantProps } from '@/utils/core/tailwind/cva'
import { cva } from '@/utils/core/tailwind/cva'

export const sizeOptions = {
	default: 'w-[80ch] ',
	sm: 'w-[60ch]',
	full: 'w-full',
	lg: 'w-[120ch]',
}

export const modalVariants = cva({
	base: 'flex flex-col rounded-modal bg-popover text-left text-popover-foreground shadow-modal-shadow',
	variants: {
		size: sizeOptions,
	},
	defaultVariants: {
		size: 'default',
	},
})

export type ModalProps = VariantProps<typeof modalVariants>
export const modalSizeOptions = Object.keys(sizeOptions)
