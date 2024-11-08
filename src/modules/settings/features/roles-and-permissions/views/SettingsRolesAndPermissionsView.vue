<script  lang="ts" setup="">
import { ref } from 'vue'

import { CalendarDateTimeTransformer } from '@/models/date/calendarDateTime.transformer.ts'
import type { CalendarDateTimeDto } from '@/models/date/calendarDateTimeDto.model.ts'
import type { Permission } from '@/models/permission/permission.model.ts'
import type { Role } from '@/models/role/role.model.ts'
import RolesAndPermissionsTable
  from '@/modules/settings/features/roles-and-permissions/components/RolesAndPermissionsTable.vue'
import { RolesAndPermissionsTableUtil } from '@/utils/rolesAndPermissionsTable.util.ts'

const permissionsDummy = ref<Permission[]>([
  {
    id: 'permission_1',
    actions: [
      'create',
      'read',
      'update',
      'delete',
    ],
  },
  {
    id: 'permission_2',
    actions: [
      'create',
      'read',
      'update',
      'delete',
    ],
  },
])

const rolesDummy = ref<Role[]>([
  {
    uuid: '1',
    createdAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    updatedAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    name: 'Role 1',
    permissions: [
      {
        id: 'permission_1',
        actions: [
          'create',
          'read',
          'update',
          'delete',
        ],
      },
    ],
  },
  {
    uuid: '2',
    createdAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    updatedAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    name: 'Role 2',
    permissions: [
      {
        id: 'permission_1',
        actions: [],
      },
      {
        id: 'permission_2',
        actions: [],
      },
    ],
  },
  {
    uuid: '3',
    createdAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    updatedAt: CalendarDateTimeTransformer.fromDto('2022-01-01T00:00:00Z' as CalendarDateTimeDto),
    name: 'Role 3',
    permissions: [
      {
        id: 'permission_1',
        actions: [
          'create',
          'read',
        ],
      },
      {
        id: 'permission_2',
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
  <div class="flex w-full flex-1 flex-col overflow-hidden pt-5">
    <RolesAndPermissionsTable
      v-model="rolesModelMap"
      :permissions="permissionsDummy"
      :roles="rolesDummy"
    />
  </div>
</template>
