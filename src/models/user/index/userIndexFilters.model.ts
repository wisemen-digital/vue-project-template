import type { SettingPermission } from '@/models/permission/permission.model.ts'

export interface UserIndexFilters {
  permissions: SettingPermission[]
}
