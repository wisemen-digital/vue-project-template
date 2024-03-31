<script setup lang="ts">
import { AppButton, BreadcrumbItem } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import type { User } from '@/models/user/detail/user.model'

const props = defineProps<{
  user: User
}>()

const { t } = useI18n()

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: t('shared.users'),
    to: {
      name: 'user-overview',
    },
    type: 'route',
  },
  {
    label: props.user.fullName,
    type: 'page',
  },
]
</script>

<template>
  <AppPage
    :breadcrumbs="breadcrumbs"
    :title="props.user.fullName"
  >
    <template #header-actions>
      <AppButton
        :to="{
          name: 'users-update',
          params: {
            userUuid: props.user.uuid,
          },
        }"
      >
        {{ t('users.detail.edit_user') }}
      </AppButton>
    </template>
  </AppPage>
</template>
