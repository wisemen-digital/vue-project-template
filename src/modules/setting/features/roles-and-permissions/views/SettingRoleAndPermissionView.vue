<script setup lang="ts">
import {
  useDialog,
  useToast,
  VcButton,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppVerticalFormElementSpacer from '@/components/app/AppVerticalFormElementSpacer.vue'
import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { useUnsavedChanges } from '@/composables/unsaved-changes/unsavedChanges.composable'
import type { SettingPermission } from '@/models/permission/permission.model'
import { useSettingRoleBulkUpdateMutation } from '@/modules/settings/api/mutations/settingRoleBulkUpdate.mutation'
import { useSettingRoleDeleteMutation } from '@/modules/settings/api/mutations/settingRoleDelete.mutation'
import SettingRoleAndPermissionTable from '@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionTable.vue'
import type { SettingRole } from '@/modules/settings/models/setting-role/settingRole.model.ts'
import { SettingRolePermissionUpdateTransformer } from '@/modules/settings/models/setting-role/settingRole.transformer.ts'
import {
  type SettingRolePermissionUpdateForm,
  settingRolePermissionUpdateFormSchema,
} from '@/modules/settings/models/setting-role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/settings/models/setting-role/settingRoleUuid.model.ts'

const props = defineProps<{
  permissions: SettingPermission[]
  roles: SettingRole[]
}>()

const { t } = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()

const addRoleDialog = useDialog({
  component: () => import('@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionRoleCreateDialog.vue'),
})
const settingsRoleDeleteMutation = useSettingRoleDeleteMutation()

const settingsRolesBulkUpdateMutation = useSettingRoleBulkUpdateMutation()

function onAddNewRoleButtonClick(): void {
  addRoleDialog.open({
    id: 'addRole',
  })
}

async function onDeleteRow(roleUuid: SettingRoleUuid): Promise<void> {
  try {
    await settingsRoleDeleteMutation.execute({
      body: roleUuid,
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

const form = useForm({
  initialState: SettingRolePermissionUpdateTransformer.toForm(props.roles, props.permissions),
  schema: settingRolePermissionUpdateFormSchema,
  onSubmit: async (values: SettingRolePermissionUpdateForm) => {
    try {
      await settingsRolesBulkUpdateMutation.execute({
        body: values,
      })

      toast.success({
        message: t('module.setting.roles_and_permissions.save_changes_success'),
      })
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
  <AppTeleport to="headerActions">
    <VcButton
      icon-left="plus"
      @click="onAddNewRoleButtonClick"
    >
      {{ t('module.setting.roles_and_permissions.add_new_role') }}
    </VcButton>
  </AppTeleport>
  <AppForm :form="form">
    <AppVerticalFormElementSpacer>
      <SettingRoleAndPermissionTable
        :form="form"
        :permissions="props.permissions"
        :roles="props.roles"
        @delete-role="onDeleteRow"
      />
      <div class="flex justify-end">
        <FormSubmitButton
          :form="form"
          :label="t('module.setting.roles_and_permissions.save_changes')"
          class="w-min"
        />
      </div>
    </AppVerticalFormElementSpacer>
  </AppForm>
</template>
