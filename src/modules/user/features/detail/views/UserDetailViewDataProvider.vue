<script setup lang="ts">
import { useRouteParams } from '@vueuse/router'

import AppDataProviderView from '@/components/app/AppDataProviderView.vue'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { useUserDetailQuery } from '@/modules/user/api/queries/userDetail.query'

import UserDetailView from './UserDetailView.vue'

const userUuid = useRouteParams<UserUuid>('userUuid')
const userDetailQuery = useUserDetailQuery(userUuid)
</script>

<template>
  <AppDataProviderView
    :queries="{
      user: userDetailQuery,
    }"
  >
    <template #default="{ data }">
      <UserDetailView :user="data.user" />
    </template>
  </AppDataProviderView>
</template>
