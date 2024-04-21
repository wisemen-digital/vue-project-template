<script setup lang="ts">
import AppDataProviderView from '@/components/app/AppDataProviderView.vue'
import { useTypedRouteParams } from '@/composables/router/typedRouteParams.composable'
import { useUserDetailQuery } from '@/modules/user/api/queries/userDetail.query'

import UserUpdateView from './UserUpdateView.vue'

const routeParams = useTypedRouteParams('user-update')
const userDetailQuery = useUserDetailQuery(routeParams.userUuid)
</script>

<template>
  <AppDataProviderView
    :queries="{
      user: userDetailQuery,
    }"
  >
    <template #default="{ data }">
      <UserUpdateView :user="data.user" />
    </template>
  </AppDataProviderView>
</template>
