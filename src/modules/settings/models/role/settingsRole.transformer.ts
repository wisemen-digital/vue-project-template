import type { SettingPermission } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import type { SettingRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { SettingRoleDto } from '@/modules/settings/models/role/settingsRoleDto.model.ts'
import type { SettingRolePermissionUpdateDto } from '@/modules/settings/models/role/settingsRolePermissionUpdateDto.model.ts'
import type { SettingRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export class SettingRolePermissionUpdateTransformer {
  static toDto(form: SettingRolePermissionUpdateForm): SettingRolePermissionUpdateDto {
    return {
      roles: form.roles
        .filter((role) => role.isEditable)
        .map((role) => ({
          roleUuid: role.roleUuid,
          permissions: role.permissions.flatMap((permission) => permission.actions),
        })),
    }
  }

  static toForm(roles: SettingRole[], permissions: SettingPermission[]): SettingRolePermissionUpdateForm {
    return {
      roles: roles.map((role) => ({
        roleUuid: role.uuid,
        isEditable: !role.isSystemAdmin,
        permissions: permissions
          .filter((permission) => role.permissions.find((value) => permission.actions.includes(value)))
          .map((permission) => ({
            actions: permission.actions,
            key: permission.key,
          })),
      })),
    }
  }
}

export class SettingsRoleTransformer {
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
