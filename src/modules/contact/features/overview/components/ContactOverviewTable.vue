<script setup lang="ts">
import type { PaginatedData } from '@wisemen/vue-core'
import {
  VcTable,
  VcTableBody,
  VcTableHead,
  VcTableHeadCell,
  VcTableRow,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import { TEST_ID } from '@/constants/testId.constant'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import ContactOverviewTableEmailCell from '@/modules/contact/features/overview/components/ContactOverviewTableEmailCell.vue'
import ContactOverviewTableNameCell from '@/modules/contact/features/overview/components/ContactOverviewTableNameCell.vue'
import ContactOverviewTablePhoneCell from '@/modules/contact/features/overview/components/ContactOverviewTablePhoneCell.vue'
import ContactOverviewTableStatusCell from '@/modules/contact/features/overview/components/ContactOverviewTableStatusCell.vue'

const props = defineProps<{
  contacts: PaginatedData<ContactIndex>
}>()

const i18n = useI18n()
</script>

<template>
  <VcTable
    :data-test-id="TEST_ID.CONTACTS.TABLE.CONTAINER"
    class="w-full"
  >
    <VcTableHead>
      <VcTableRow>
        <VcTableHeadCell>
          {{ i18n.t('contact.name') }}
        </VcTableHeadCell>
        <VcTableHeadCell>
          {{ i18n.t('contact.email') }}
        </VcTableHeadCell>
        <VcTableHeadCell>
          {{ i18n.t('contact.phone') }}
        </VcTableHeadCell>
        <VcTableHeadCell>
          {{ i18n.t('contact.status') }}
        </VcTableHeadCell>
      </VcTableRow>
    </VcTableHead>
    <VcTableBody>
      <VcTableRow
        v-for="contact in props.contacts.data"
        :key="contact.uuid"
      >
        <ContactOverviewTableNameCell :contact="contact" />
        <ContactOverviewTableEmailCell :contact="contact" />
        <ContactOverviewTablePhoneCell :contact="contact" />
        <ContactOverviewTableStatusCell :contact="contact" />
      </VcTableRow>
    </VcTableBody>
  </VcTable>
</template>
