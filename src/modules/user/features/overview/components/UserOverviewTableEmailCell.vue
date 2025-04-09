<script setup lang="ts">
import {
  VcRouterLinkButton,
  VcTableCell,
} from '@wisemen/vue-core-components'
import { computed } from 'vue'

import { TEST_ID } from '@/constants/testId.constant'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model'
import { useUserDetailPrefetchQuery } from '@/modules/user/api/queries/userDetail.query'

const props = defineProps<{
  user: UserIndex
}>()

const userDetailPrefetchQuery = useUserDetailPrefetchQuery(computed<UserUuid>(() => props.user.uuid))

function onMouseEnter(): void {
  userDetailPrefetchQuery.execute()
}
</script>

<template>
  <VcTableCell
    :is-primary-cell="true"
    :data-test-id="TEST_ID.USERS.OVERVIEW.TABLE.EMAIL"
  >
    <VcRouterLinkButton
      :to="{
        name: 'user-detail',
        params: {
          userUuid: props.user.uuid,
        },
      }"
      size="sm"
      variant="tertiary"
      class="hover:underline"
      @focusin="onMouseEnter"
      @mouseenter="onMouseEnter"
    >
      {{ props.user.email }}
    </VcRouterLinkButton>
  </VcTableCell>
</template>
