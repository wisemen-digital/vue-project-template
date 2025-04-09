<script setup lang="ts">
import { VcIcon } from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import SettingsRoleAndPermissionTableHeaderCell from '@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionTableHeaderCell.vue'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

const props = defineProps<{
  roles: SettingsRole[]
}>()

const emit = defineEmits<{
  deleteRole: [SettingsRoleUuid]
}>()

const i18n = useI18n()

function onDeleteRole(roleUuid: SettingsRoleUuid): void {
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
      <SettingsRoleAndPermissionTableHeaderCell
        :role="role"
        @delete-role="onDeleteRole"
      />
    </div>
  </div>
</template>
