<script  lang="ts" setup="">
import { ref } from 'vue'

import type { Permission } from '@/models/permission/permission.model.ts'
import type { Role } from '@/models/role/role.model.ts'
import RolesAndPermissionsTable
  from '@/modules/settings/features/users/components/RolesAndPermissionsTable.vue'
import { RolesAndPermissionsTableUtil } from '@/utils/rolesAndPermissionsTable.util.ts'

const props = defineProps<{
  permissions: Permission[]
  roles: Role[]
}>()

const rolesModelMap = ref<Map<string, null | string[]>>(
  new Map(
    RolesAndPermissionsTableUtil.createGrid(
      props.permissions,
      props.roles,
    ),
  ),
)
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden py-5">
    <RolesAndPermissionsTable
      v-model="rolesModelMap"
      :permissions="props.permissions"
      :roles="props.roles"
    />
  </div>
</template>
