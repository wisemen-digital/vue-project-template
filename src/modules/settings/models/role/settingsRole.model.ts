import type { Permission } from '@/client'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export interface SettingsRole {
  uuid: SettingsRoleUuid
  isDefault: boolean
  isSystemAdmin: boolean
  name: string
  permissions: Permission[]
}
