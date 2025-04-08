<script setup lang="ts">
import {
  VcRouterLinkButton,
  VcTableCell,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import { TEST_ID } from '@/constants/testId.constant'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import { useContactDetailPrefetchQuery } from '@/modules/contact/api/queries/contactDetail.query'

const props = defineProps<{
  contact: ContactIndex
}>()

const contactDetailPrefetchQuery = useContactDetailPrefetchQuery(computed<ContactUuid>(() => props.contact.uuid))

function onMouseEnter(): void {
  contactDetailPrefetchQuery.execute()
}
</script>

<template>
  <VcTableCell>
    <VcRouterLinkButton
      v-if="props.contact.phone"
      :data-test-id="TEST_ID.CONTACTS.TABLE.PHONE_LINK"
      :to="{
        name: 'contact-detail',
        params: {
          contactUuid: props.contact.uuid,
        },
      }"
      @mouseenter="onMouseEnter"
    >
      {{ props.contact.phone }}
    </VcRouterLinkButton>
    <span v-else>-</span>
  </VcTableCell>
</template>
