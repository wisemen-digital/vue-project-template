<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import SettingRoleAndPermissionTableHeaderCell from '@/modules/setting/features/roles-and-permissions/components/SettingRoleAndPermissionTableHeaderCell.vue'
import type { SettingRole } from '@/modules/setting/models/role/settingRole.model.ts'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

const props = defineProps<{
  roles: SettingRole[]
}>()

const emit = defineEmits<{
  deleteRole: [SettingRoleUuid]
}>()

const i18n = useI18n()

function onDeleteRole(roleUuid: SettingRoleUuid): void {
  emit('deleteRole', roleUuid)
}
</script>

<template>
  <div
    class="
      border-secondary bg-secondary sticky top-0 z-2 col-span-full grid
      grid-cols-subgrid border-b border-solid
    "
  >
    <div
      class="
        border-secondary bg-secondary text-secondary sticky left-0 z-1 flex
        items-center gap-2 border-r border-solid p-3 px-6 text-sm
      "
    >
      <span>
        {{ i18n.t('module.settings.roles_and_permissions.table.permissions') }}
      </span>
      <VcIcon
        class="size-4"
        icon="bottomRightCorner"
      />
    </div>
    <div
      v-for="role of props.roles"
      :key="role.uuid"
      class="
        border-secondary border-r border-solid
        last:border-none
      "
    >
      <SettingRoleAndPermissionTableHeaderCell
        :role="role"
        @delete-role="onDeleteRole"
      />
    </div>
  </div>
</template>
