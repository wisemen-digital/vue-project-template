<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import type { SettingRole } from '@/models/setting-role/role.model.ts'
import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'
import SettingRoleAndPermissionTableHeaderCell from '@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionTableHeaderCell.vue'

const props = defineProps<{
  roles: SettingRole[]
}>()

const emit = defineEmits<{
  deleteRole: [RoleUuid]
}>()

const { t } = useI18n()

function onDeleteRole(roleUuid: RoleUuid): void {
  emit('deleteRole', roleUuid)
}
</script>

<template>
  <div
    class="sticky top-0 z-2 col-span-full grid grid-cols-subgrid border-b border-solid border-secondary bg-secondary"
  >
    <div
      class="sticky left-0 z-1 flex items-center gap-2 border-r border-solid border-secondary bg-secondary p-3 px-6 text-sm text-secondary"
    >
      <span>
        {{ t('module.settings.roles_and_permissions.table.permissions') }}
      </span>
      <VcIcon
        class="size-4"
        icon="bottomRightCorner"
      />
    </div>
    <div
      v-for="role of props.roles"
      :key="role.uuid"
      class="border-r border-solid border-secondary last:border-none"
    >
      <SettingRoleAndPermissionTableHeaderCell
        :role="role"
        @delete-role="onDeleteRole"
      />
    </div>
  </div>
</template>
