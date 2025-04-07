import { z } from 'zod'

import {
  FontSize,
  Locale,
} from '@/client'
import { settingPreferenceThemeSchema } from '@/modules/setting/models/preference/settingPreferenceTheme.enum.ts'

export const settingPreferenceUpdateFormSchema = z.object({
  fontSize: z.nativeEnum(FontSize).optional(),
  highContrast: z.boolean().optional(),
  language: z.nativeEnum(Locale).optional(),
  reduceMotion: z.boolean().optional(),
  showShortcuts: z.boolean().optional(),
  theme: settingPreferenceThemeSchema.optional(),
})

export type SettingPreferenceUpdateForm = z.infer<typeof settingPreferenceUpdateFormSchema>
