<script setup lang="ts">
import { useTypedRouteParams } from '@wisemen/vue-core'

import AppDataProviderView from '@/components/app/AppDataProviderView.vue'
import { useUserDetailQuery } from '@/modules/user/api/queries/userDetail.query'

import UserDetailView from './UserDetailView.vue'

const routeParams = useTypedRouteParams('user-detail')
const userDetailQuery = useUserDetailQuery(routeParams.userUuid)
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
