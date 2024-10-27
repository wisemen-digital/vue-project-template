<script setup lang="ts">
import { AppTableCell } from '@wisemen/vue-core'

import AppRouterLink from '@/components/app/link/AppRouterLink.vue'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'

const props = defineProps<{
  user: UserIndex
}>()
</script>

<template>
  <AppTableCell>
    <AppRouterLink
      :to="{
        name: 'user-detail',
        params: {
          userUuid: props.user.uuid,
        },
      }"
      class="hover:underline"
    >
      {{ props.user.fullName }}
    </AppRouterLink>
  </AppTableCell>
</template>
