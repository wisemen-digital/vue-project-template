<script setup lang="ts">
import {
  useDocumentTitle,
  usePagination,
  VcRouterLinkButton,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Permission } from '@/client'
import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppPaginationSearchField from '@/components/app/search/AppPaginationSearchField.vue'
import AppTablePage from '@/components/layout/AppTablePage.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import { useContactIndexQuery } from '@/modules/contact/api/queries/contactIndex.query'
import ContactOverviewTable from '@/modules/contact/features/overview/components/ContactOverviewTable.vue'
import { useAuthStore } from '@/stores/auth.store'

const i18n = useI18n()
const authStore = useAuthStore()

const documentTitle = useDocumentTitle()

documentTitle.set(i18n.t('contact.label.plural'))

const pagination = usePagination<ContactIndexPagination>({
  isRouteQueryEnabled: true,
  key: 'contactIndex',
})

const contactIndexQuery = useContactIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => contactIndexQuery.isLoading.value)
const error = computed<unknown>(() => contactIndexQuery.error.value)
const isCreateButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.CONTACT_CREATE))
</script>

<template>
  <AppTablePage
    :title="i18n.t('contact.label.plural')"
  >
    <template #header-actions>
      <VcRouterLinkButton
        v-if="isCreateButtonVisible"
        :to="{ name: 'contact-create' }"
        :data-test-id="TEST_ID.CONTACTS.OVERVIEW.CREATE_BUTTON"
        color="primary"
        icon="plus"
      >
        {{ i18n.t('contact.create') }}
      </VcRouterLinkButton>
    </template>

    <template #default>
      <div
        v-if="error !== null"
        class="flex size-full flex-1 items-center justify-center"
      >
        <AppErrorState :error="error" />
      </div>

      <div
        v-else
        class="gap-lg flex flex-1 flex-col"
      >
        <AppPaginationSearchField
          :is-loading="contactIndexQuery.isLoading.value"
          :pagination="pagination"
        />

        <ContactOverviewTable
          :data="contactIndexQuery.data.value"
          :is-loading="isLoading"
          :pagination="pagination"
          :error="contactIndexQuery.error.value"
        />
      </div>
    </template>
  </AppTablePage>
</template>
