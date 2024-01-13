import { cva } from '@/libs/cva.lib'

export const selectDropdown = cva({
  base: 'max-h-60 min-w-[10rem] overflow-y-auto rounded-popover border border-solid border-border bg-background p-1 shadow-popover-shadow outline-none',
})

export const selectOption = cva({
  base: 'flex cursor-default items-center gap-x-2 rounded px-3 py-2 text-subtext text-muted-foreground outline-none',
  variants: {
    isActive: {
      true: 'bg-muted-background',
    },
    isSelected: {
      true: 'text-foreground',
    },
    isDisabled: {
      true: 'cursor-not-allowed opacity-50',
    },
  },
})
