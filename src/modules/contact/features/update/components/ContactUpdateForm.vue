<script setup lang="ts">
import {
  useToast,
  VcPhoneNumberField,
  VcTextField,
} from '@wisemen/vue-core'
import { useForm } from 'formango'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import FormGrid from '@/components/app/grid/FormGrid.vue'
import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import AppForm from '@/components/form/AppForm.vue'
import FormFieldset from '@/components/form/FormFieldset.vue'
import FormLayout from '@/components/form/FormLayout.vue'
import FormSubmitButton from '@/components/form/FormSubmitButton.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable'
import { TEST_ID } from '@/constants/testId.constant'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import { contactUpdateFormSchema } from '@/models/contact/update/contactUpdateForm.model'
import { useContactUpdateMutation } from '@/modules/contact/api/mutations/contactUpdate.mutation'
import { toFormField } from '@/utils/formango.util'

const props = defineProps<{
  contact: ContactDetail
}>()

const i18n = useI18n()
const router = useRouter()
const toast = useToast()
const errorToast = useApiErrorToast()
const contactUpdateMutation = useContactUpdateMutation()

const form = useForm({
  initialState: () => ({
    isActive: props.contact.isActive,
    email: props.contact.email,
    firstName: props.contact.firstName,
    lastName: props.contact.lastName,
    phone: props.contact.phone,
  }),
  schema: contactUpdateFormSchema,
  onSubmit: async (values) => {
    try {
      await contactUpdateMutation.execute({
        body: values,
        params: { contactUuid: props.contact.uuid },
      })

      await router.push({
        name: 'contact-detail',
        params: { contactUuid: props.contact.uuid },
      })
    }
    catch (error) {
      errorToast.show(error)
    }
  },
  onSubmitError: () => {
    toast.error({ message: i18n.t('error.invalid_form_input.description') })
  },
})

const firstName = form.register('firstName')
const lastName = form.register('lastName')
const email = form.register('email')
const phone = form.register('phone')
</script>

<template>
  <AppForm :form="form">
    <template #default="{ formId }">
      <AppTeleport to="headerActions">
        <FormSubmitButton
          :form-id="formId"
          :form="form"
          :data-test-id="TEST_ID.CONTACTS.FORM.SUBMIT_BUTTON"
          :label="i18n.t('form.save_changes')"
        />
      </AppTeleport>

      <FormLayout>
        <FormFieldset
          :title="i18n.t('module.contact.personal_info')"
        >
          <FormGrid :cols="2">
            <VcTextField
              v-bind="toFormField(firstName)"
              :label="i18n.t('module.contact.first_name')"
            />
            <VcTextField
              v-bind="toFormField(lastName)"
              :label="i18n.t('module.contact.last_name')"
            />
          </FormGrid>
        </FormFieldset>

        <FormFieldset
          :title="i18n.t('module.contact.contact_info')"
        >
          <FormGrid :cols="2">
            <VcTextField
              v-bind="toFormField(email)"
              :label="i18n.t('module.contact.email')"
            />
            <VcPhoneNumberField
              v-bind="toFormField(phone)"
              :label="i18n.t('module.contact.phone')"
            />
          </FormGrid>
        </FormFieldset>
      </FormLayout>
    </template>
  </AppForm>
</template>
