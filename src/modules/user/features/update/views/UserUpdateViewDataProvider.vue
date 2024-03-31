<script setup lang="ts">
import { computed } from 'vue'

import { useTypedRouteParams } from '@/composables/router/typedRouteParams.composable'
import type { User } from '@/models/user/detail/user.model'
import { useUserDetailQuery } from '@/modules/user/api/queries/userDetail.query'

import UsersUpdateView from './UserUpdateView.vue'

const routeParams = useTypedRouteParams('user-detail')
const usersDetailQuery = useUserDetailQuery(routeParams.userUuid)

const user = computed<User | null>(() => usersDetailQuery.data.value)
</script>

<template>
  <UsersUpdateView
    v-if="user !== null"
    :user="user"
  />
</template>
