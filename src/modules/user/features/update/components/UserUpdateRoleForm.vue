<script setup lang="ts">
import type { SelectItem } from '@wisemen/vue-core'
import {
  useToast,
  VcSelect,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

import FormGrid from '@/components/app/grid/FormGrid.vue'
import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import { toFormField } from '@/helpers/formango.helper.ts'
import type { SettingRole } from '@/models/setting-role/role.model.ts'
import { roleUuidSchema } from '@/models/setting-role/roleUuid.model.ts'
import type { User } from '@/models/user/detail/user.model.ts'
import { useSettingRolesQuery } from '@/modules/settings/api/queries/settingRole.query.ts'
import { useUserUpdateRoleMutation } from '@/modules/user/api/mutations/userUpdate.mutation.ts'

const props = defineProps<{
  user: User
}>()

const { t } = useI18n()

const toast = useToast()
const errorToast = useApiErrorToast()
const userUpdateRoleMutation = useUserUpdateRoleMutation()

const roleQuery = useSettingRolesQuery()

const roleItems = computed<SelectItem<SettingRole>[]>(() => {
  return roleQuery.data.value?.map((role): SelectItem<SettingRole> => {
    return {
      type: 'option',
      value: role,
    }
  }) ?? []
})

const form = useForm({
  schema: z.object({
    role: z.object({
      uuid: roleUuidSchema,
      name: z.string(),
    }),
  }),
  onSubmit: async (values) => {
    try {
      await userUpdateRoleMutation.execute({
        body: values.role.uuid,
        params: {
          userUuid: props.user.uuid,
        },
      })

      toast.success({
        testId: TEST_ID.USERS.UPDATE.SUCCESS_TOAST,
        message: t('module.user.update.success_toast.message'),
      })
    }
    catch (error) {
      errorToast.show(error)
    }
  },
  onSubmitError: () => {
    toast.error({
      message: t('error.invalid_form_input.description'),
    })
  },
})

const role = form.register('role')
</script>

<template>
  <AppForm :form="form">
    <template #default="{ formId }">
      <AppTeleport to="headerActions">
        <FormSubmitButton
          :form-id="formId"
          :form="form"
          :data-test-id="TEST_ID.USERS.FORM.SUBMIT_BUTTON"
          :label="t('form.save_changes')"
        />
      </AppTeleport>

      <FormLayout>
        <FormFieldset
          :description="t('module.user.form.section.name.description')"
          :title="t('user.name')"
        >
          <FormGrid :cols="2">
            <VcSelect
              :test-id="TEST_ID.USERS.FORM.FIRST_NAME_INPUT"
              v-bind="toFormField(role)"
              :display-fn="(item) => item.name"
              :items="roleItems"
              :label="t('module.user.role')"
            />
          </FormGrid>
        </FormFieldset>
      </FormLayout>
    </template>
  </AppForm>
</template>
