<script setup lang="ts">
import {
  useDocumentTitle,
  usePagination,
  VcButton,
  VcPagination,
  VcSpinner,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Permission } from '@/client'
import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppPaginationSearchField from '@/components/app/search/AppPaginationSearchField.vue'
import AppTablePage from '@/components/layout/AppTablePage.vue'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import { useContactIndexQuery } from '@/modules/contact/api/queries/contactIndex.query'
import ContactOverviewTable from '@/modules/contact/features/overview/components/ContactOverviewTable.vue'
import { useAuthStore } from '@/stores/auth.store'

const i18n = useI18n()
const authStore = useAuthStore()

const documentTitle = useDocumentTitle()

documentTitle.value = i18n.t('contact.label.plural')

const pagination = usePagination<ContactIndexPagination>({
  defaultPagination: {
    filter: {},
    sort: undefined,
  },
})

const contactIndexQuery = useContactIndexQuery(computed(() => pagination.options.value))

const isCreateButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.CONTACT_CREATE))
</script>

<template>
  <AppTablePage
    :title="i18n.t('contact.label.plural')"
  >
    <template #header-actions>
      <AppPaginationSearchField
        v-model="pagination.search"
        :placeholder="i18n.t('shared.search')"
      />
      <VcButton
        v-if="isCreateButtonVisible"
        :to="{ name: 'contact-create' }"
        :data-test-id="TEST_ID.CONTACTS.OVERVIEW.CREATE_BUTTON"
        color="primary"
        icon="plus"
      >
        {{ i18n.t('contact.create') }}
      </VcButton>
    </template>

    <template #default>
      <div
        v-if="contactIndexQuery.isLoading.value"
        class="flex justify-center py-8"
      >
        <VcSpinner size="lg" />
      </div>

      <AppErrorState
        v-else-if="contactIndexQuery.isError.value"
        :error="contactIndexQuery.error.value"
      />

      <div v-else-if="contactIndexQuery.data.value">
        <ContactOverviewTable :contacts="contactIndexQuery.data.value" />

        <VcPagination
          v-if="contactIndexQuery.data.value.meta.totalPages > 1"
          v-model="pagination.page"
          :total-pages="contactIndexQuery.data.value.meta.totalPages"
          class="mt-4"
        />
      </div>
    </template>
  </AppTablePage>
</template>
