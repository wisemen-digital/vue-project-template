<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { logError } from '@/utils/logger.util'

import AppText from '../text/AppText.vue'

const props = defineProps<{
  message: null | string
  status: number
}>()

const { t } = useI18n()

const httpErrorMap = new Map<string, string>(
  Object.entries({
    400: t('error.bad_request'),
    401: t('error.unauthorized'),
    403: t('error.forbidden'),
    404: t('error.resource_not_found'),
    500: t('error.internal_server_error'),
  }),
)

logError(props.message)
</script>

<template>
  <AppText
    class="flex items-center p-4"
    variant="subtext"
  >
    <span class="border-r border-solid border-neutral-200 px-4 tracking-wider text-muted-foreground/75">
      {{ props.status }}
    </span>

    <span class="px-4 uppercase tracking-wider text-muted-foreground/75">
      {{ httpErrorMap.get(`${status}`) ?? t('suspense.something_went_wrong') }}
    </span>
  </AppText>
</template>
