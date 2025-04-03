import type { SettingPermission } from '@/modules/setting/models/permission/settingPermission.model.ts'
import type { SettingRole } from '@/modules/setting/models/role/settingRole.model.ts'
import type { SettingRoleDto } from '@/modules/setting/models/role/settingRoleDto.model.ts'
import type { SettingRolePermissionUpdateDto } from '@/modules/setting/models/role/settingRolePermissionUpdateDto.model.ts'
import type { SettingRolePermissionUpdateForm } from '@/modules/setting/models/role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

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
