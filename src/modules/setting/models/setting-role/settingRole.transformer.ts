import type { SettingPermission } from '@/models/permission/permission.model.ts'
import type { SettingRole } from '@/modules/settings/models/setting-role/settingRole.model.ts'
import type { SettingRoleDto } from '@/modules/settings/models/setting-role/settingRoleDto.model.ts'
import type { SettingRolePermissionUpdateDto } from '@/modules/settings/models/setting-role/settingRolePermissionUpdateDto.model.ts'
import type { SettingRolePermissionUpdateForm } from '@/modules/settings/models/setting-role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/settings/models/setting-role/settingRoleUuid.model.ts'

export class SettingRolePermissionUpdateTransformer {
  static toDto(form: SettingRolePermissionUpdateForm): SettingRolePermissionUpdateDto {
    return {
      roles: form.roles
        .filter((role) => role.isEditable)
        .map((role) => ({
          permissions: role.permissions.flatMap((permission) => permission.actions),
          roleUuid: role.roleUuid,
        })),
    }
  }

  static toForm(roles: SettingRole[], permissions: SettingPermission[]): SettingRolePermissionUpdateForm {
    return {
      roles: roles.map((role) => ({
        isEditable: !role.isSystemAdmin,
        permissions: permissions
          .filter((permission) => role.permissions.find((value) => permission.actions.includes(value)))
          .map((permission) => ({
            actions: permission.actions,
            key: permission.key,
          })),
        roleUuid: role.uuid,
      })),
    }
  }
}

export class SettingRoleTransformer {
  static fromDto(dto: SettingRoleDto): SettingRole {
    return {
      uuid: dto.uuid as SettingRoleUuid,
      isDefault: dto.isDefault,
      isSystemAdmin: dto.isSystemAdmin,
      name: dto.name,
      permissions: dto.permissions,
    }
  }
}
