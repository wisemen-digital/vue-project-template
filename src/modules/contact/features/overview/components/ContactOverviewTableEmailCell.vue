<script setup lang="ts">
import {
  VcRouterLinkButton,
  VcTableCell,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { TEST_ID } from '@/constants/testId.constant'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import { useContactDetailPrefetchQuery } from '@/modules/contact/api/queries/contactDetail.query'

const props = defineProps<{
  contact: ContactIndex
}>()

const i18n = useI18n()

const contactDetailPrefetchQuery = useContactDetailPrefetchQuery(computed<ContactUuid>(() => props.contact.uuid))

function onMouseEnter(): void {
  contactDetailPrefetchQuery.execute()
}
</script>

<template>
  <VcTableCell
    :data-test-id="TEST_ID.CONTACTS.TABLE.EMAIL_LINK"
  >
    <VcRouterLinkButton
      v-if="props.contact.email"
      :to="{
        name: 'contact-detail',
        params: {
          contactUuid: props.contact.uuid,
        },
      }"
      size="sm"
      variant="tertiary"
      class="hover:underline"
      @focusin="onMouseEnter"
      @mouseenter="onMouseEnter"
    >
      {{ props.contact.email }}
    </VcRouterLinkButton>
    <span v-else>{{ i18n.t('shared.empty_dash') }}</span>
  </VcTableCell>
</template>
