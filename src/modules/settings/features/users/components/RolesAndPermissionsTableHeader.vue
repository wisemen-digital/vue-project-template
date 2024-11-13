<script setup lang="ts">
import { AppIcon } from '@wisemen/vue-core'

import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import type { Role } from '@/models/role/role.model.ts'
import type { RoleUuid } from '@/models/role/roleUuid.model.ts'
import RolesAndPermissionsRoleHeaderCell
  from '@/modules/settings/features/users/components/RolesAndPermissionsRoleHeaderCell.vue'

const props = defineProps<{
  roles: Role[]
}>()

const emit = defineEmits<{
  deleteRole: [RoleUuid]
}>()

const i18n = useI18n()

function onDeleteRole(roleUuid: RoleUuid): void {
  emit('deleteRole', roleUuid)
}
</script>

<template>
  <div
    class="sticky top-0 z-40 col-span-full grid grid-cols-subgrid border-b border-solid border-secondary bg-secondary"
  >
    <div
      class="sticky left-0 z-10 flex items-center gap-2 border-r border-solid border-secondary bg-secondary p-3 px-6 text-sm text-secondary"
    >
      <span>
        {{ i18n.t('module.settings.roles_and_permissions.table.permissions') }}
      </span>
      <AppIcon
        icon="cornerRightDown"
      />
    </div>
    <div
      v-for="role of props.roles"
      :key="role.uuid"
      class="border-r border-solid border-secondary last:border-none"
    >
      <RolesAndPermissionsRoleHeaderCell
        :role="role"
        @delete-role="onDeleteRole"
      />
    </div>
  </div>
</template>
