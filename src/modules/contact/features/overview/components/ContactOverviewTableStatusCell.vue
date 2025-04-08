<script setup lang="ts">
import { VcTableCell } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import type { ContactIndex } from '@/models/contact/index/contactIndex.model'

const props = defineProps<{
  contact: ContactIndex
}>()

const i18n = useI18n()
</script>

<template>
  <VcTableCell
    data-test-id="contact-status"
  >
    <span v-if="props.contact.isActive">
      {{ i18n.t('contact.status.active') }}
    </span>
    <span v-else>
      {{ i18n.t('contact.status.inactive') }}
    </span>
  </VcTableCell>
</template>
