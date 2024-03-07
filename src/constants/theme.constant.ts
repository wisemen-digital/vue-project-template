import { z } from 'zod'

export const themeConstantSchema = z.enum(['custom-theme'])

export type ThemeConstant = z.infer<typeof themeConstantSchema>
