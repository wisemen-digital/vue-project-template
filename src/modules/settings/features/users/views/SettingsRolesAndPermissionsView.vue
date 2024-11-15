<script  lang="ts" setup="">
import {
  AppButton,
  useDialog,
  useToast,
} from '@wisemen/vue-core'
import { computed, ref } from 'vue'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import { useUnsavedChanges } from '@/composables/unsaved-changes/unsavedChanges.composable.ts'
import type { Permission } from '@/models/permission/permission.model.ts'
import type { Role } from '@/models/role/role.model.ts'
import type { RoleUuid } from '@/models/role/roleUuid.model.ts'
import { useSettingsRoleDeleteMutation } from '@/modules/settings/api/mutations/settingsRoleDelete.mutation.ts'
import { useSettingsRolesBulkUpdateMutation } from '@/modules/settings/api/mutations/settingsRolesBulkUpdate.mutation.ts'
import RolesAndPermissionsTable
  from '@/modules/settings/features/users/components/RolesAndPermissionsTable.vue'
import { RolesAndPermissionsTableUtil } from '@/modules/settings/utils/rolesAndPermissionsTable.util.ts'
import { MapUtil } from '@/utils/map.util.ts'

const props = defineProps<{
  permissions: Permission[]
  roles: Role[]
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()

const addRoleDialog = useDialog({
  component: () => import('@/modules/settings/features/users/components/RolesAndPermissionsAddRoleDialog.vue'),
})
const settingsRoleDelte = useSettingsRoleDeleteMutation()
const rolesModelMap = ref<Map<string, null | string[]>>(
  new Map(
    RolesAndPermissionsTableUtil.createGrid(
      props.permissions,
      props.roles,
    ),
  ),
)
const rolesModelMapSnapshot = ref<Map<string, null | string[]>>(new Map(rolesModelMap.value))
const isRolesModelMapChanged = computed<boolean>(() => {
  return !MapUtil.areEqual(rolesModelMap.value, rolesModelMapSnapshot.value)
})

function onAddNewRoleButtonClick(): void {
  addRoleDialog.open()
}

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

const settingsRolesBulkUpdateMutation = useSettingsRolesBulkUpdateMutation()

async function onSaveChangesButtonClick(): Promise<void> {
  try {
    await settingsRolesBulkUpdateMutation.execute({
      body: RolesAndPermissionsTableUtil.mapGridToRoles(rolesModelMap.value, props.permissions, props.roles),
    })

    toast.success({
      message: i18n.t('module.settings.roles_and_permissions.toast.save_success'),
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
  <div class="flex flex-1 flex-col overflow-hidden py-5">
    <AppTeleport to="headerActions">
      <AppButton
        icon-left="plus"
        @click="onAddNewRoleButtonClick"
      >
        {{ i18n.t('shared.add_item', { item: i18n.t('shared.role') }) }}
      </AppButton>
      <AppButton
        :is-disabled="!isRolesModelMapChanged"
        :is-loading="settingsRolesBulkUpdateMutation.isLoading.value"
        @click="onSaveChangesButtonClick"
      >
        {{ i18n.t('form.save_changes') }}
      </AppButton>
    </AppTeleport>
    <RolesAndPermissionsTable
      v-model="rolesModelMap"
      :permissions="props.permissions"
      :roles="props.roles"
      @delete-role="onDeleteRow"
    />
  </div>
</template>
