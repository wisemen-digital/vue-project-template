<script setup lang="ts">
import {
  useDialog,
  useToast,
  VcButton,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/group/AppGroup.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { useUnsavedChanges } from '@/composables/unsaved-changes/unsavedChanges.composable'
import { useSettingRoleBulkUpdateMutation } from '@/modules/setting/api/mutations/settingRoleBulkUpdate.mutation'
import { useSettingRoleDeleteMutation } from '@/modules/setting/api/mutations/settingRoleDelete.mutation'
import { useSettingPermissionQuery } from '@/modules/setting/api/queries/settingPermission.query.ts'
import { useSettingRolesQuery } from '@/modules/setting/api/queries/settingRole.query.ts'
import SettingContainer from '@/modules/setting/components/SettingContainer.vue'
import type { SettingNavigation } from '@/modules/setting/composables/settingNavigation.composable.ts'
import SettingRoleAndPermissionTable from '@/modules/setting/features/roles-and-permissions/components/SettingRoleAndPermissionTable.vue'
import type { SettingPermission } from '@/modules/setting/models/permission/settingPermission.model.ts'
import type { SettingRole } from '@/modules/setting/models/role/settingRole.model.ts'
import { SettingRolePermissionUpdateTransformer } from '@/modules/setting/models/role/settingRole.transformer.ts'
import type { SettingRolePermissionUpdateForm } from '@/modules/setting/models/role/settingRolePermissionUpdateForm.model.ts'
import { settingRolePermissionUpdateFormSchema } from '@/modules/setting/models/role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

const props = defineProps<{
  navigation: SettingNavigation
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()

const settingPermissionQuery = useSettingPermissionQuery()
const settingRoleQuery = useSettingRolesQuery()

const addRoleDialog = useDialog({ component: () => import('@/modules/setting/features/roles-and-permissions/components/SettingRoleAndPermissionRoleCreateDialog.vue') })
const settingsRoleDeleteMutation = useSettingRoleDeleteMutation()
const settingsRolesBulkUpdateMutation = useSettingRoleBulkUpdateMutation()

const permissions = computed<SettingPermission[]>(() => settingPermissionQuery.data.value ?? [])
const roles = computed<SettingRole[]>(() => settingRoleQuery.data.value ?? [])

function onAddNewRoleButtonClick(): void {
  addRoleDialog.open({ id: 'addRole' })
}

async function onDeleteRow(roleUuid: SettingRoleUuid): Promise<void> {
  try {
    await settingsRoleDeleteMutation.execute({ body: roleUuid })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

const form = useForm({
  initialState: computed<SettingRolePermissionUpdateForm>(() => {
    return SettingRolePermissionUpdateTransformer.toForm(roles.value, permissions.value)
  }),
  schema: settingRolePermissionUpdateFormSchema,
  onSubmit: async (values: SettingRolePermissionUpdateForm) => {
    try {
      await settingsRolesBulkUpdateMutation.execute({ body: values })

      toast.success({ message: i18n.t('module.setting.roles_and_permissions.save_changes_success') })
    }
    catch (error) {
      apiErrorToast.show(error)
    }
  },
})

const isRolesModelMapChanged = computed<boolean>(() => form.isDirty.value)

useUnsavedChanges(isRolesModelMapChanged)
</script>

<template>
  <SettingContainer
    :title="i18n.t('module.setting.roles_and_permissions.title')"
    :navigation="props.navigation"
  >
    <AppForm
      :form="form"
      class="bg-error-200 relative h-full"
    >
      <SettingRoleAndPermissionTable
        :form="form"
        :permissions="permissions"
        :roles="roles"
        @delete-role="onDeleteRow"
      />
      <AppGroup
        direction="row"
        justify="end"
        class="
          border-secondary bg-primary p-lg sticky bottom-0 left-0 z-10 w-full
          border-t
        "
      >
        <VcButton
          size="sm"
          icon-left="plus"
          @click="onAddNewRoleButtonClick"
        >
          {{ i18n.t('module.setting.roles_and_permissions.add_new_role') }}
        </VcButton>
        <FormSubmitButton
          :form="form"
          :label="i18n.t('module.setting.roles_and_permissions.save_changes')"
          class="w-min"
        />
      </AppGroup>
    </AppForm>
  </SettingContainer>
</template>
