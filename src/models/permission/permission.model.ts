import { z } from 'zod'

import { Permission } from '@/client'

export interface SettingPermission {
  actions: Permission[]
  key: string
}

export const permissionSchema = z.nativeEnum(Permission)
