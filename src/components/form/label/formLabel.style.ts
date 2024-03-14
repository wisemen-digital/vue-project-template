import { cva } from '@/libs/cva.lib'

export const formLabel = cva({
  base: 'text-subtext text-muted-foreground',
  variants: {
    isDisabled: {
      true: 'opacity-50',
    },
    isInvalid: {
      true: 'text-destructive',
    },
  },
})
