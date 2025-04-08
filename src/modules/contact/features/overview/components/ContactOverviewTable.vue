<script setup lang="ts">
import type {
  PaginatedData,
  Pagination,
  TableColumn,
} from '@wisemen/vue-core'
import { VcTable } from '@wisemen/vue-core'
import type { VNode } from 'vue'
import {
  computed,
  h,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import { TEST_ID } from '@/constants/testId.constant'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import ContactOverviewTableEmailCell from '@/modules/contact/features/overview/components/ContactOverviewTableEmailCell.vue'
import ContactOverviewTableNameCell from '@/modules/contact/features/overview/components/ContactOverviewTableNameCell.vue'
import ContactOverviewTablePhoneCell from '@/modules/contact/features/overview/components/ContactOverviewTablePhoneCell.vue'
import ContactOverviewTableStatusCell from '@/modules/contact/features/overview/components/ContactOverviewTableStatusCell.vue'

const props = defineProps<{
  isLoading: boolean
  data: PaginatedData<ContactIndex> | null
  error: unknown | null
  pagination: Pagination<ContactIndexPagination>
}>()

const i18n = useI18n()

const columns = computed<TableColumn<ContactIndex>[]>(() => [
  {
    testId: TEST_ID.CONTACTS.TABLE.NAME_LINK,
    isSortable: true,
    cell: (contact): VNode => h(ContactOverviewTableNameCell, { contact }),
    headerLabel: i18n.t('contact.name'),
    key: 'name',
  },
  {
    testId: TEST_ID.CONTACTS.TABLE.EMAIL_LINK,
    isSortable: true,
    cell: (contact): VNode => h(ContactOverviewTableEmailCell, { contact }),
    headerLabel: i18n.t('contact.email'),
    key: 'email',
  },
  {
    testId: TEST_ID.CONTACTS.TABLE.PHONE_LINK,
    isSortable: true,
    cell: (contact): VNode => h(ContactOverviewTablePhoneCell, { contact }),
    headerLabel: i18n.t('contact.phone'),
    key: 'phone',
  },
  {
    testId: 'contact-status',
    isSortable: true,
    cell: (contact): VNode => h(ContactOverviewTableStatusCell, { contact }),
    headerLabel: i18n.t('contact.status'),
    key: 'status',
  },
])
</script>

<template>
  <div
    v-if="props.error !== null"
    class="flex size-full flex-1 items-center justify-center"
  >
    <AppErrorState :error="props.error" />
  </div>

  <VcTable
    v-else
    :columns="columns"
    :data="props.data"
    :data-test-id="TEST_ID.CONTACTS.TABLE.CONTAINER"
    :is-first-column-sticky="true"
    :is-loading="props.isLoading"
    :pagination="props.pagination"
    class="basis-0"
  />
</template>
