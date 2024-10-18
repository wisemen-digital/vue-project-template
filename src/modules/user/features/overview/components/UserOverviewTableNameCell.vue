<script setup lang="ts">
import { AppTableCell } from '@wisemen/vue-core'

import AppTypedRouterLink from '@/components/app/link/AppTypedRouterLink.vue'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'

const props = defineProps<{
  user: UserIndex
}>()
</script>

<template>
  <AppTableCell>
    <AppTypedRouterLink
      :to="{
        name: 'user-detail',
        params: {
          userUuid: props.user.uuid,
        },
      }"
      class="hover:underline"
    >
      {{ props.user.fullName }}
    </AppTypedRouterLink>
  </AppTableCell>
</template>
