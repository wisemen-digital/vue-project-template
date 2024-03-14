import type { VariantProps } from '@/libs/cva.lib'
import { cva } from '@/libs/cva.lib'

export const variantOptions = {
  default: 'bg-background text-foreground',
  error: 'bg-destructive/20 text-destructive',
  info: 'bg-info/20 text-info',
  success: 'bg-success/20 text-success',
  warn: 'bg-warn/20 text-warn',
}

export const containerVariantOptions = {
  default: 'border-border',
  error: 'border-destructive',
  info: 'border-info',
  success: 'border-success',
  warn: 'border-warn',
}

export const toast = cva({
  base: 'flex items-center justify-between gap-2 px-2 py-1',
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: variantOptions,
  },
})

export const toastContainer = cva({
  base: 'w-full overflow-hidden rounded border bg-white shadow-card-shadow lg:w-80',
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: containerVariantOptions,
  },
})

export type ToastProps = VariantProps<typeof toast>
export type ToastContainerProps = VariantProps<typeof toastContainer>
