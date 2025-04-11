<script setup lang="ts">
import { computed } from 'vue'

import AppDataProviderView from '@/components/app/AppDataProviderView.vue'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import { useContactDetailQuery } from '@/modules/contact/api/queries/contactDetail.query'
import ContactDetailView from '@/modules/contact/features/detail/views/ContactDetailView.vue'

const props = defineProps<{
  contactUuid: ContactUuid
}>()

const contactDetailQuery = useContactDetailQuery(computed<ContactUuid>(() => props.contactUuid))
</script>

<template>
  <AppDataProviderView
    :queries="{
      contact: contactDetailQuery,
    }"
  >
    <template #default="{ data }">
      <ContactDetailView :contact="data.contact" />
    </template>
  </AppDataProviderView>
</template>
