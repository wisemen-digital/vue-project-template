import { z } from 'zod'

import { Permission } from '@/client'

export interface SettingsPermission {
  actions: Permission[]
  key: string
}

export const settingsPermissionSchema = z.nativeEnum(Permission)
