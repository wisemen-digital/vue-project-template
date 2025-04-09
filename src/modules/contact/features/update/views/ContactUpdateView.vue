<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import FormPage from '@/components/form/FormPage.vue'
import { ContactUtil } from '@/models/contact/contact.util'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import ContactUpdateForm from '@/modules/contact/features/update/components/ContactUpdateForm.vue'

const props = defineProps<{
  contact: ContactDetail
}>()

const i18n = useI18n()
const fullName = computed<string | null>(() => ContactUtil.getFullName(props.contact))

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: i18n.t('module.contact.label.plural'),
    to: { name: 'contact-overview' },
    type: 'route',
  },
  {
    label: fullName.value ?? props.contact.email ?? i18n.t('module.contact.unknown'),
    to: {
      name: 'contact-detail',
      params: { contactUuid: props.contact.uuid },
    },
    type: 'route',
  },
  {
    label: i18n.t('shared.edit'),
    type: 'page',
  },
]
</script>

<template>
  <FormPage
    :title="i18n.t('module.contact.update.title')"
    :breadcrumbs="breadcrumbs"
  >
    <ContactUpdateForm :contact="contact" />
  </FormPage>
</template>
