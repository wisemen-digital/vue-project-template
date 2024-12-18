<script setup lang="ts">
import { computed } from 'vue'

import AppDataProviderView from '@/components/app/AppDataProviderView.vue'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { useUserDetailQuery } from '@/modules/user/api/queries/userDetail.query'
import UserUpdateView from '@/modules/user/features/update/views/UserUpdateView.vue'

const props = defineProps<{
  userUuid: UserUuid
}>()

const userDetailQuery = useUserDetailQuery(computed<UserUuid>(() => props.userUuid))
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
