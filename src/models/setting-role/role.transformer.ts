import { PermissionTransformer } from '@/models/permission/permission.transformer.ts'
import type { RoleName } from '@/models/setting-role/role.enum.ts'
import type { SettingRole } from '@/models/setting-role/role.model.ts'
import type { RoleDto } from '@/models/setting-role/roleDto.model.ts'
import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'

export class RoleTransformer {
  static fromDto(dto: RoleDto): SettingRole {
    return {
      uuid: dto.uuid as RoleUuid,
      name: dto.name as RoleName,
      permissions: PermissionTransformer.fromDto(dto.permissions),
    }
  }
}
