<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import {
  VcButton,
  VcRouterLinkButton,
} from '@wisemen/vue-core'
import { useVcDialog } from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { Permission } from '@/client'
import AppPage from '@/components/layout/AppPage.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import { TEST_ID } from '@/constants/testId.constant'
import { ContactUtil } from '@/models/contact/contact.util'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import { useContactDeleteMutation } from '@/modules/contact/api/mutations/contactDelete.mutation.ts'
import { useAuthStore } from '@/stores/auth.store'

const props = defineProps<{
  contact: ContactDetail
}>()

const i18n = useI18n()
const apiErrorToast = useApiErrorToast()
const router = useRouter()
const authStore = useAuthStore()

const confirmDeleteDialog = useVcDialog({ component: () => import('@/components/dialog/AppConfirmDialog.vue') })

const fullName = computed<string | null>(() => ContactUtil.getFullName(props.contact))
const contactDeleteMutation = useContactDeleteMutation()
const breadcrumbs: BreadcrumbItem[] = [
  {
    label: i18n.t('module.contact.label.plural'),
    to: { name: 'contact-overview' },
    type: 'route',
  },
  {
    label: fullName.value ?? props.contact.email ?? i18n.t('module.contact.unknown'),
    type: 'page',
  },
]

const isEditButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.CONTACT_UPDATE))
const isDeleteButtonVisible = computed<boolean>(() => authStore.hasPermission(Permission.CONTACT_DELETE))

function onDeleteContact(): void {
  confirmDeleteDialog.open({
    title: i18n.t('module.contact.delete.confirm.title'),
    isDestructive: true,
    isLoading: contactDeleteMutation.isLoading.value,
    cancelText: i18n.t('shared.cancel'),
    confirmText: i18n.t('shared.delete'),
    description: i18n.t('module.contact.delete.confirm.description', { name: fullName.value ?? props.contact.email }),
    onConfirm: async () => {
      try {
        await contactDeleteMutation.execute({ params: { contactUuid: props.contact.uuid } })
        await router.push({ name: 'contact-overview' })
        confirmDeleteDialog.close()
      }
      catch (error) {
        apiErrorToast.show(error)
      }
    },
  })
}
</script>

<template>
  <AppPage
    :title="fullName ?? contact.email ?? i18n.t('module.contact.unknown')"
    :breadcrumbs="breadcrumbs"
  >
    <template #header-actions>
      <VcButton
        v-if="isDeleteButtonVisible"
        :data-test-id="TEST_ID.CONTACTS.DETAIL.DELETE_BUTTON"
        variant="destructive-secondary"
        @click="onDeleteContact"
      >
        {{ i18n.t('shared.delete') }}
      </VcButton>
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
          {{ i18n.t('module.contact.personal_info') }}
        </h2>
        <div class="space-y-2">
          <div>
            <span class="font-medium">{{ i18n.t('module.contact.first_name') }}</span>
            <span class="ml-2">{{ contact.firstName ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('module.contact.last_name') }}</span>
            <span class="ml-2">{{ contact.lastName ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('module.contact.email') }}</span>
            <span class="ml-2">{{ contact.email ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('module.contact.phone') }}</span>
            <span class="ml-2">{{ contact.phone ?? '-' }}</span>
          </div>
          <div>
            <span class="font-medium">{{ i18n.t('module.contact.status') }}</span>
            <span class="ml-2">
              <span v-if="props.contact.isActive">
                {{ i18n.t('module.contact.status.active') }}
              </span>
              <span v-else>
                {{ i18n.t('module.contact.status.inactive') }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </AppPage>
</template>
