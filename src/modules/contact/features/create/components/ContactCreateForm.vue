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
import { contactCreateFormSchema } from '@/models/contact/create/contactCreateForm.model'
import { useContactCreateMutation } from '@/modules/contact/api/mutations/contactCreate.mutation'
import { toFormField } from '@/utils/formango.util'

const i18n = useI18n()
const router = useRouter()
const toast = useToast()
const errorToast = useApiErrorToast()
const contactCreateMutation = useContactCreateMutation()

const form = useForm({
  initialState: () => ({
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
  }),
  schema: contactCreateFormSchema,
  onSubmit: async (values) => {
    try {
      const contactUuid = await contactCreateMutation.execute({ body: values })

      await router.push({
        name: 'contact-detail',
        params: { contactUuid },
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
          :form="form"
          :form-id="formId"
          :data-test-id="TEST_ID.CONTACTS.FORM.SUBMIT_BUTTON"
          :label="i18n.t('shared.save')"
        />
      </AppTeleport>

      <FormLayout>
        <FormFieldset :title="i18n.t('module.contact.personal_info')">
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
              type="email"
            />
            <VcPhoneNumberField
              v-bind="toFormField(phone)"
              :label="i18n.t('module.contact.phone')"
              type="tel"
            />
          </FormGrid>
        </FormFieldset>
      </FormLayout>
    </template>
  </AppForm>
</template>
