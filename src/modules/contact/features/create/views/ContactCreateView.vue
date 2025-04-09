<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import FormPage from '@/components/form/FormPage.vue'
import ContactCreateForm from '@/modules/contact/features/create/components/ContactCreateForm.vue'

const i18n = useI18n()

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: i18n.t('module.contact.label.plural'),
    to: { name: 'contact-overview' },
    type: 'route',
  },
  {
    label: i18n.t('module.contact.create'),
    type: 'page',
  },
]
</script>

<template>
  <FormPage
    :title="i18n.t('module.contact.create.title')"
    :breadcrumbs="breadcrumbs"
  >
    <ContactCreateForm />
  </FormPage>
</template>
