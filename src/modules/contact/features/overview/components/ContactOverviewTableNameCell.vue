<script setup lang="ts">
import {
  VcRouterLinkButton,
  VcTableCell,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import { TEST_ID } from '@/constants/testId.constant'
import { ContactUtil } from '@/models/contact/contact.util'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import { useContactDetailPrefetchQuery } from '@/modules/contact/api/queries/contactDetail.query'

const props = defineProps<{
  contact: ContactIndex
}>()

const contactDetailPrefetchQuery = useContactDetailPrefetchQuery(computed<ContactUuid>(() => props.contact.uuid))
const fullName = computed<string | null>(() => ContactUtil.getFullName(props.contact))

function onMouseEnter(): void {
  contactDetailPrefetchQuery.execute()
}
</script>

<template>
  <VcTableCell>
    <VcRouterLinkButton
      v-if="fullName"
      :data-test-id="TEST_ID.CONTACTS.TABLE.NAME_LINK"
      :to="{
        name: 'contact-detail',
        params: {
          contactUuid: props.contact.uuid,
        },
      }"
      @mouseenter="onMouseEnter"
    >
      {{ fullName }}
    </VcRouterLinkButton>
    <span v-else>-</span>
  </VcTableCell>
</template>
