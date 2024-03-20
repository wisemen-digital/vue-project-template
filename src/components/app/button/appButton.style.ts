import type { VariantProps } from 'class-variance-authority'

import { cva } from '@/libs/cva.lib'

export const button = cva({
  base: 'relative inline-flex flex-shrink-0 items-center justify-center gap-x-2 rounded-button border border-solid text-subtext font-medium ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
  variants: {
    isLoading: {
      true: '!opacity-100',
    },
    size: {
      default: 'h-10 px-4 py-2',
      icon: 'size-10 gap-x-0',
      lg: 'h-11 rounded-button px-8',
      sm: 'h-9 rounded-button px-3',
    },
    variant: {
      default:
        'border-primary bg-primary text-primary-foreground focus-visible:ring-primary hover:enabled:bg-primary/90',
      destructive: 'border-destructive bg-transparent text-destructive focus-visible:ring-destructive',
      ghost:
        'border-transparent text-muted-foreground focus-visible:ring-muted-foreground/50 hover:enabled:bg-muted-background',
      outline:
        'border-border bg-background focus:border-primary focus-visible:ring-primary hover:enabled:text-muted-foreground',
      secondary:
        'border-muted-background bg-muted-background text-muted-foreground focus-visible:ring-muted-foreground/25 hover:enabled:bg-muted-background/80',
    },
  },
})

export const buttonIcon = cva({
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'size-3.5',
      icon: 'size-3.5',
      lg: 'size-4',
      sm: 'size-3.5',
    },
  },
})

export type ButtonProps = VariantProps<typeof button>
