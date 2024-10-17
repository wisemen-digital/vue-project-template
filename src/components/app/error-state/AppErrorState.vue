<script setup lang="ts">
import { AxiosError } from 'axios'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import GridBackgroundPattern from '@/assets/svgs/GridBackgroundPattern.vue'

const props = defineProps<{
  error: unknown
}>()

const { t } = useI18n()

function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof AxiosError
}

const httpStatus = computed<null | number>(() => {
  if (isAxiosError(props.error)) {
    return props.error.response?.status ?? 500
  }

  return null
})

const httpErrorMap = new Map<string, string>(
  Object.entries({
    400: t('error.bad_request.title'),
    401: t('error.unauthorized.title'),
    403: t('error.forbidden.title'),
    404: t('error.resource_not_found.title'),
    500: t('error.internal_server_error.title'),
  }),
)

const title = computed<string>(() => {
  if (httpStatus.value === null) {
    return t('error.default_error.title')
  }

  return `${httpStatus.value}`
})

const description = computed<string>(() => {
  if (httpStatus.value === null) {
    return (props.error as Error).message
  }

  return httpErrorMap.get(`${httpStatus.value}`) ?? t('error.default_error.title')
})
</script>

<template>
  <div class="relative flex h-96 min-w-96 items-center justify-center overflow-hidden">
    <GridBackgroundPattern class="absolute size-full scale-125 text-gray-200 dark:text-gray-900" />

    <div class="relative z-10">
      <span
        class="flex items-center p-4 text-subtext font-medium"
      >
        <span class="whitespace-nowrap border-r border-solid border-tertiary px-5 tracking-wider text-quaternary">
          {{ title }}
        </span>

        <span class="min-w-60 px-4 font-medium uppercase tracking-wider text-quaternary">
          {{ description }}
        </span>
      </span>
    </div>
  </div>
</template>
