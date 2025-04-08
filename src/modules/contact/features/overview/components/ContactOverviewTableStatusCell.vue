<script setup lang="ts">
import {
  VcBadge,
  VcTableCell,
} from '@wisemen/vue-core'
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
    <VcBadge
      v-if="props.contact.isActive"
      color="success"
    >
      {{ i18n.t('contact.status.active') }}
    </VcBadge>
    <VcBadge
      v-else
      color="error"
    >
      {{ i18n.t('contact.status.inactive') }}
    </VcBadge>
  </VcTableCell>
</template>
