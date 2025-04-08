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
      v-if="props.contact.email"
      :data-test-id="TEST_ID.CONTACTS.TABLE.EMAIL_LINK"
      :to="{
        name: 'contact-detail',
        params: {
          contactUuid: props.contact.uuid,
        },
      }"
      @mouseenter="onMouseEnter"
    >
      {{ props.contact.email }}
    </VcRouterLinkButton>
    <span v-else>-</span>
  </VcTableCell>
</template>
