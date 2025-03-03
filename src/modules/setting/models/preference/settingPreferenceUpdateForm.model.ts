import { z } from 'zod'

import { settingPreferenceThemeSchema } from '@/modules/setting/models/preference/settingPreferenceTheme.enum.ts'

export const settingPreferenceUpdateFormSchema = z.object({
  fontSize: z.string().optional(),
  highContrast: z.boolean().optional(),
  language: z.string().optional(),
  reduceMotion: z.boolean().optional(),
  showShortcuts: z.boolean().optional(),
  theme: settingPreferenceThemeSchema.optional(),
})

export type SettingPreferenceUpdateForm = z.infer<typeof settingPreferenceUpdateFormSchema>
