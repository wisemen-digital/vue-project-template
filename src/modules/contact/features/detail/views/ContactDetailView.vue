<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { VcRouterLinkButton } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Permission } from '@/client'
import AppPage from '@/components/layout/AppPage.vue'
import { TEST_ID } from '@/constants/testId.constant'
import { ContactUtil } from '@/models/contact/contact.util'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps<{
  contact: ContactDetail
}>()

const i18n = useI18n()
const authStore = useAuthStore()

const fullName = computed<string | null>(() => ContactUtil.getFullName(props.contact))

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: i18n.t('contact.label.plural'),
    to: { name: 'contact-overview' },
    type: 'route',
  },
  {
    label: fullName.value ?? props.contact.email ?? i18n.t('contact.unknown'),
    type: 'page',
  },
]

const isEditButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.CONTACT_UPDATE))
</script>

<template>
  <AppPage
    :title="fullName ?? contact.email ?? i18n.t('contact.unknown')"
    :breadcrumbs="breadcrumbs"
  >
    <template #header-actions>
      <VcRouterLinkButton
        v-if="isEditButtonVisible"
        :to="{
          name: 'contact-update',
          params: {
            contactUuid: props.contact.uuid,
          },
        }"
        :data-test-id="TEST_ID.CONTACTS.DETAIL.EDIT_BUTTON"
      >
        {{ i18n.t('module.contact.detail.edit_contact') }}
      </VcRouterLinkButton>
    </template>

    <div
      class="
        grid grid-cols-1 gap-4
        md:grid-cols-2
      "
    >
      <div
        class="
          rounded-lg border border-gray-200 p-4
          dark:border-gray-700
        "
      >
        <h2 class="mb-4 text-lg font-medium">
          {{ i18n.t('contact.personal_info') }}
        </h2>
        <div class="space-y-2">
          <div>
            <span class="font-medium">{{ i18n.t('contact.first_name') }}</span>
            <span class="ml-2">{{ contact.firstName ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('contact.last_name') }}</span>
            <span class="ml-2">{{ contact.lastName ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('contact.email') }}</span>
            <span class="ml-2">{{ contact.email ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('contact.phone') }}</span>
            <span class="ml-2">{{ contact.phone ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('contact.status') }}</span>
            <span class="ml-2">
              <span v-if="contact.isActive">
                {{ i18n.t('contact.status.active') }}
              </span>
              <span v-else>
                {{ i18n.t('contact.status.inactive') }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>
