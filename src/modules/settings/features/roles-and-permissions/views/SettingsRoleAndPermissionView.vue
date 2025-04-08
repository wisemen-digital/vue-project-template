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
import { useSettingsRoleBulkUpdateMutation } from '@/modules/settings/api/mutations/settingsRoleBulkUpdate.mutation.ts'
import { useSettingsRoleDeleteMutation } from '@/modules/settings/api/mutations/settingsRoleDelete.mutation.ts'
import { useSettingsPermissionQuery } from '@/modules/settings/api/queries/settingsPermission.query.ts'
import { useSettingsRolesQuery } from '@/modules/settings/api/queries/settingsRole.query.ts'
import SettingsDialogContainer from '@/modules/settings/components/SettingsDialogContainer.vue'
import type { SettingsNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'
import SettingsRoleAndPermissionTable from '@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionTable.vue'
import type { SettingsPermission } from '@/modules/settings/models/permission/settingsPermission.model.ts'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import { SettingsRolePermissionUpdateTransformer } from '@/modules/settings/models/role/settingsRole.transformer.ts'
import type { SettingsRolePermissionUpdateForm } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import { settingsRolePermissionUpdateFormSchema } from '@/modules/settings/models/role/settingsRolePermissionUpdateForm.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

const props = defineProps<{
  navigation: SettingsNavigation
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const toast = useToast()

const settingsPermissionQuery = useSettingsPermissionQuery()
const settingsRoleQuery = useSettingsRolesQuery()

const addRoleDialog = useDialog({ component: () => import('@/modules/settings/features/roles-and-permissions/components/SettingsRoleAndPermissionRoleCreateDialog.vue') })
const settingsRoleDeleteMutation = useSettingsRoleDeleteMutation()
const settingsRolesBulkUpdateMutation = useSettingsRoleBulkUpdateMutation()

const permissions = computed<SettingsPermission[]>(() => settingsPermissionQuery.data.value ?? [])
const roles = computed<SettingsRole[]>(() => settingsRoleQuery.data.value ?? [])

function onAddNewRoleButtonClick(): void {
  addRoleDialog.open({ id: 'addRole' })
}

async function onDeleteRow(roleUuid: SettingsRoleUuid): Promise<void> {
  try {
    await settingsRoleDeleteMutation.execute({ body: roleUuid })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

const form = useForm({
  initialState: computed<SettingsRolePermissionUpdateForm>(() => {
    return SettingsRolePermissionUpdateTransformer.toForm(roles.value, permissions.value)
  }),
  schema: settingsRolePermissionUpdateFormSchema,
  onSubmit: async (values: SettingsRolePermissionUpdateForm) => {
    try {
      await settingsRolesBulkUpdateMutation.execute({ body: values })

      toast.success({ message: i18n.t('module.settings.roles_and_permissions.save_changes_success') })
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
  <SettingsDialogContainer
    :title="i18n.t('module.settings.roles_and_permissions.title')"
    :navigation="props.navigation"
  >
    <AppForm
      :form="form"
      class="bg-error-200 relative h-full"
    >
      <SettingsRoleAndPermissionTable
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
          {{ i18n.t('module.settings.roles_and_permissions.add_new_role') }}
        </VcButton>
        <FormSubmitButton
          :form="form"
          :label="i18n.t('module.settings.roles_and_permissions.save_changes')"
          class="w-min"
        />
      </AppGroup>
    </AppForm>
  </SettingsDialogContainer>
</template>
