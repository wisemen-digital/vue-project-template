<script setup lang="ts">
import {
  useToast,
  VcCheckbox,
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
    isActive: true,
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
  }),
  schema: contactCreateFormSchema,
  onSubmit: async (values) => {
    try {
      const contactUuid = await contactCreateMutation.execute({ body: values })

      toast.success({
        testId: TEST_ID.CONTACTS.CREATE.SUCCESS_TOAST,
        message: i18n.t('module.contact.create.success_toast.message'),
      })

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
const isActive = form.register('isActive', false)
</script>

<template>
  <AppForm :form="form">
    <template #default="{ formId }">
      <AppTeleport to="headerActions">
        <FormSubmitButton
          :form-id="formId"
          :form="form"
          :data-test-id="TEST_ID.CONTACTS.FORM.SUBMIT_BUTTON"
          :label="i18n.t('form.save')"
        />
      </AppTeleport>

      <FormLayout>
        <FormFieldset
          :description="i18n.t('module.contact.form.section.name.description')"
          :title="i18n.t('contact.personal_info')"
        >
          <FormGrid :cols="2">
            <VcTextField
              :test-id="TEST_ID.CONTACTS.FORM.FIRST_NAME_INPUT"
              v-bind="toFormField(firstName)"
              :label="i18n.t('contact.first_name')"
            />
            <VcTextField
              :test-id="TEST_ID.CONTACTS.FORM.LAST_NAME_INPUT"
              v-bind="toFormField(lastName)"
              :label="i18n.t('contact.last_name')"
            />
          </FormGrid>
        </FormFieldset>

        <FormFieldset
          :description="i18n.t('module.contact.form.section.contact.description')"
          :title="i18n.t('contact.contact_info')"
        >
          <FormGrid :cols="2">
            <VcTextField
              :test-id="TEST_ID.CONTACTS.FORM.EMAIL_INPUT"
              v-bind="toFormField(email)"
              :label="i18n.t('contact.email')"
              type="email"
            />
            <VcTextField
              :test-id="TEST_ID.CONTACTS.FORM.PHONE_INPUT"
              v-bind="toFormField(phone)"
              :label="i18n.t('contact.phone')"
              type="tel"
            />
          </FormGrid>
        </FormFieldset>

        <FormFieldset
          :description="i18n.t('module.contact.form.section.status.description')"
          :title="i18n.t('contact.status')"
        >
          <VcCheckbox
            :test-id="TEST_ID.CONTACTS.FORM.IS_ACTIVE_CHECKBOX"
            v-bind="toFormField(isActive)"
            :label="i18n.t('contact.is_active')"
          />
        </FormFieldset>
      </FormLayout>
    </template>
  </AppForm>
</template>
