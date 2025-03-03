import { z } from 'zod'

import { Theme } from '@/client'

export const settingPreferenceThemeSchema = z.nativeEnum(Theme)
