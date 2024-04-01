<script setup lang="ts">
import { computed } from 'vue'

import { useTypedRouteParams } from '@/composables/router/typedRouteParams.composable'
import type { User } from '@/models/users/detail/user.model'
import { useGetUsersDetailQuery } from '@/modules/users/api/queries/usersDetail.query'

import UsersUpdateView from './UsersUpdateView.vue'

const routeParams = useTypedRouteParams('users-detail')
const getUsersDetailQuery = useGetUsersDetailQuery(routeParams.userUuid)

const user = computed<User | null>(() => getUsersDetailQuery.data.value)
</script>

<template>
  <UsersUpdateView
    v-if="user !== null"
    :user="user"
  />
</template>
