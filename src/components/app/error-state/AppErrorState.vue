<script setup lang="ts">
import { AppText } from '@wisemen/vue-core'
import { AxiosError } from 'axios'
import { useI18n } from 'vue-i18n'

import GridBackgroundPattern from '@/assets/svgs/GridBackgroundPattern.vue'

const props = defineProps<{
  error: AxiosError
}>()

const { t } = useI18n()

const status = props.error.response?.status ?? 500

const httpErrorMap = new Map<string, string>(
  Object.entries({
    400: t('error.bad_request.title'),
    401: t('error.unauthorized.title'),
    403: t('error.forbidden.title'),
    404: t('error.resource_not_found.title'),
    500: t('error.internal_server_error.title'),
  }),
)
</script>

<template>
  <div class="relative flex size-96 items-center justify-center overflow-hidden">
    <GridBackgroundPattern class="absolute size-full scale-125 text-muted" />

    <div class="relative z-10">
      <AppText
        class="flex items-center p-4 font-medium"
        variant="subtext"
      >
        <span class="border-r border-solid border-muted-foreground/75 px-5 tracking-wider text-muted-foreground/75">
          {{ status }}
        </span>

        <span class="px-4 font-medium uppercase tracking-wider text-muted-foreground/75">
          {{ httpErrorMap.get(`${status}`) ?? t('suspense.something_went_wrong') }}
        </span>
      </AppText>
    </div>
  </div>
</template>
