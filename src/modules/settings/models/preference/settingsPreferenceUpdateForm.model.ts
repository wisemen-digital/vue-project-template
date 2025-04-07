import { z } from 'zod'

import {
  FontSize,
  Locale,
  UiTheme,
} from '@/client'

export const settingsPreferenceUpdateFormSchema = z.object({
  fontSize: z.nativeEnum(FontSize).optional(),
  highContrast: z.boolean().optional(),
  language: z.nativeEnum(Locale).optional(),
  reduceMotion: z.boolean().optional(),
  showShortcuts: z.boolean().optional(),
  theme: z.nativeEnum(UiTheme).optional(),
})

export type SettingsPreferenceUpdateForm = z.infer<typeof settingsPreferenceUpdateFormSchema>
