<script setup lang="ts">
import { useTypedRouteParams } from '@/composables/router/typedRouteParams.composable'
import { useGetUsersDetailQuery } from '@/modules/users/api/queries/usersDetail.query'

import UsersUpdateView from './UsersUpdateView.vue'

const { userUuid } = useTypedRouteParams('users-detail')
const { data: user } = useGetUsersDetailQuery(userUuid)
</script>

<template>
	<UsersUpdateView
		v-if="user !== null"
		:user="user"
	/>
</template>
