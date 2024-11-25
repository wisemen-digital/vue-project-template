<script  lang="ts" setup="">
import { AppDialog, AppTextField } from '@wisemen/vue-core'
import { useForm } from 'formango'
import { z } from 'zod'

import AppDialogActionCancel from '@/components/app/dialog/AppDialogActionCancel.vue'
import AppDialogActions from '@/components/app/dialog/AppDialogActions.vue'
import AppDialogContent from '@/components/app/dialog/AppDialogContent.vue'
import AppDialogHeader from '@/components/app/dialog/AppDialogHeader.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import { useSettingsRoleCreateMutation } from '@/modules/settings/api/mutations/settingsRoleCreate.mutation.ts'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const settingsRoleCreateMutation = useSettingsRoleCreateMutation()

const { form, onSubmitForm } = useForm({
  schema: z.object({
    name: z.string(),
  }),
})

const name = form.register('name')

function onClose(): void {
  emit('close')
}

onSubmitForm(async (formState) => {
  try {
    await settingsRoleCreateMutation.execute({
      body: formState.name,
    })
    onClose()
  }
  catch (error) {
    apiErrorToast.show(error)
  }
})
</script>

<template>
  <AppDialog
    :is-open="props.isOpen"
    @close="onClose"
  >
    <AppDialogContent
      size="sm"
    >
      <AppDialogHeader
        :title="i18n.t('module.settings.roles_and_permissions.add_role_dialog.title')"
      />
      <div class="py-4">
        <AppForm :form="form">
          <AppTextField
            :label="i18n.t('user.name')"
            v-bind="name"
          />
          <AppDialogActions>
            <AppDialogActionCancel :label="i18n.t('shared.cancel')" />
            <FormSubmitButton
              :form="form"
              :label="i18n.t('shared.save')"
            />
          </AppDialogActions>
        </AppForm>
      </div>
    </AppDialogContent>
  </AppDialog>
</template>
