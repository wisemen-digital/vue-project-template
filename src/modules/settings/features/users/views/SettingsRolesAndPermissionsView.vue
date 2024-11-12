<script  lang="ts" setup="">
import { ref } from 'vue'

import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { CalendarDateTimeDto } from '@/models/date/calendarDateTimeDto.model.ts'
import type { Permission } from '@/models/permission/permission.model.ts'
import type { PermissionAction } from '@/models/permission/permissionAction.model.ts'
import type { PermissionId } from '@/models/permission/permissionId.model.ts'
import { RoleName } from '@/models/role/role.enum.ts'
import type { Role } from '@/models/role/role.model.ts'
import type { RoleUuid } from '@/models/role/roleUuid.model.ts'
import RolesAndPermissionsTable
  from '@/modules/settings/features/users/components/RolesAndPermissionsTable.vue'
import { RolesAndPermissionsTableUtil } from '@/utils/rolesAndPermissionsTable.util.ts'

const permissionsDummy = ref<Permission[]>([
  {
    id: 'permission_1' as PermissionId,
    actions: [
      'create' as PermissionAction,
      'read' as PermissionAction,
      'update' as PermissionAction,
      'delete' as PermissionAction,
    ],
  },
  {
    id: 'permission_2' as PermissionId,
    actions: [
      'create' as PermissionAction,
      'read' as PermissionAction,
      'update' as PermissionAction,
      'delete' as PermissionAction,
    ],
  },
])

const rolesDummy = ref<Role[]>([
  {
    uuid: '1' as RoleUuid,
    createdAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    updatedAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    name: RoleName.USER,
    permissions: [
      {
        id: 'permission_1' as PermissionId,
        actions: [
          'create' as PermissionAction,
          'read' as PermissionAction,
          'update' as PermissionAction,
          'delete' as PermissionAction,
        ],
      },
    ],
  },
  {
    uuid: '2' as RoleUuid,
    createdAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    updatedAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    name: RoleName.TEST,
    permissions: [
      {
        id: 'permission_1' as PermissionId,
        actions: [],
      },
      {
        id: 'permission_2' as PermissionId,
        actions: [],
      },
    ],
  },
  {
    uuid: '3' as RoleUuid,
    createdAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    updatedAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    name: RoleName.ADMIN,
    permissions: [
      {
        id: 'permission_1' as PermissionId,
        actions: [
          'create' as PermissionAction,
          'read' as PermissionAction,
        ],
      },
      {
        id: 'permission_2' as PermissionId,
        actions: [],
      },
    ],
  },
])

// ---------------------------------

const rolesModelMap = ref<Map<string, null | string[]>>(
  new Map(RolesAndPermissionsTableUtil.createGrid(permissionsDummy.value, rolesDummy.value)),
)
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden py-5">
    <RolesAndPermissionsTable
      v-model="rolesModelMap"
      :permissions="permissionsDummy"
      :roles="rolesDummy"
    />
  </div>
</template>
