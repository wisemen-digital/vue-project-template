<script setup lang="ts">
import type { BreadcrumbItem } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import AppEditItemButton from '@/components/app/button/AppEditItemButton.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model'

const props = defineProps<{
  user: UserDetail
}>()

const { t } = useI18n()

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: t('user.label.plural'),
    to: {
      name: 'user-overview',
    },
    type: 'route',
  },
  {
    label: props.user.email,
    type: 'page',
  },
]
</script>

<template>
  <AppPage
    :title="props.user.email"
    :breadcrumbs="breadcrumbs"
  >
    <template #header-actions>
      <AppEditItemButton
        :to="{
          name: 'user-update',
          params: {
            userUuid: props.user.uuid,
          },
        }"
        :data-test-id="TEST_ID.USERS.DETAIL.EDIT_BUTTON"
        :label="t('module.user.detail.edit_user')"
      />
    </template>
  </AppPage>
</template>
