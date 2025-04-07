import { z } from 'zod'

import { UiTheme } from '@/client'

export const settingPreferenceThemeSchema = z.nativeEnum(UiTheme)
