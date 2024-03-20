import { z } from 'zod'

export const themeConstantSchema = z.enum([
  'dark',
])

export type ThemeConstant = z.infer<typeof themeConstantSchema>
