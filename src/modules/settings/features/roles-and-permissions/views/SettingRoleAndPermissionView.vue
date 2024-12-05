<script setup lang="ts">
import { useToast } from '@wisemen/vue-core'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { useUnsavedChanges } from '@/composables/unsaved-changes/unsavedChanges.composable'
import type { Permission } from '@/models/permission/permission.model'
import type { Role } from '@/models/role/role.model'
import type { RoleUuid } from '@/models/role/roleUuid.model'
import { useSettingRoleBulkUpdateMutation } from '@/modules/settings/api/mutations/settingRoleBulkUpdate.mutation'
import { useSettingRoleDeleteMutation } from '@/modules/settings/api/mutations/settingRoleDelete.mutation'
import SettingRoleAndPermissionTable from '@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionTable.vue'
import { RoleAndPermissionTableUtil } from '@/modules/settings/utils/roleAndPermissionTable.util'

const props = defineProps<{
  permissions: Permission[]
  roles: Role[]
}>()

const { t } = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()

// const addRoleDialog = useDialog({
//   component: () => import('@/modules/settings/features/users/components/RolesAndPermissionsAddRoleDialog.vue'),
// })
const settingsRoleDelte = useSettingRoleDeleteMutation()
const rolesModelMap = ref<Map<string, string[] | null>>(
  new Map(
    RoleAndPermissionTableUtil.createGrid(
      props.permissions,
      props.roles,
    ),
  ),
)
const settingsRolesBulkUpdateMutation = useSettingRoleBulkUpdateMutation()

const rolesModelMapSnapshot = ref<Map<string, string[] | null>>(new Map(rolesModelMap.value))

const isRolesModelMapChanged = computed<boolean>(() => {
  return !RoleAndPermissionTableUtil.isTableStateEqual(rolesModelMap.value, rolesModelMapSnapshot.value)
})

// function onAddNewRoleButtonClick(): void {
//   addRoleDialog.open()
// }

async function onDeleteRow(roleUuid: RoleUuid): Promise<void> {
  try {
    await settingsRoleDelte.execute({
      body: roleUuid,
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

async function onSaveChangesButtonClick(): Promise<void> {
  try {
    await settingsRolesBulkUpdateMutation.execute({
      body: RoleAndPermissionTableUtil.mapGridToRoles(rolesModelMap.value, props.permissions, props.roles),
    })

    toast.success({
      message: 'Suc6',
    })

    resetRolesModelMapSnapshot()
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

function resetRolesModelMapSnapshot(): void {
  rolesModelMapSnapshot.value = new Map(rolesModelMap.value)
}

useUnsavedChanges(isRolesModelMapChanged)
</script>

<template>
  <div>
    <SettingRoleAndPermissionTable
      v-model="rolesModelMap"
      :permissions="props.permissions"
      :roles="props.roles"
      @delete-row="onDeleteRow"
    />
  </div>
</template>
