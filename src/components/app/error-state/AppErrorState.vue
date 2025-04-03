<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import GridDecorativeBackgroundPattern from '@/components/decorative/GridDecorativeBackgroundPattern.vue'
import { ApiErrorUtil } from '@/utils/apiError.util.ts'

const props = defineProps<{
  error: unknown
}>()

const i18n = useI18n()

const httpStatus = computed<string | null>(() => {
  const isApiError = ApiErrorUtil.isError(props.error)

  if (isApiError) {
    return props.error?.errors[0]?.status ?? '500'
  }

  return null
})

const httpErrorMap = new Map<string, string>(
  Object.entries({
    400: i18n.t('error.bad_request.title'),
    401: i18n.t('error.unauthorized.title'),
    403: i18n.t('error.forbidden.title'),
    404: i18n.t('error.resource_not_found.title'),
    500: i18n.t('error.internal_server_error.title'),
  }),
)

const title = computed<string>(() => {
  if (httpStatus.value === null) {
    return i18n.t('error.default_error.title')
  }

  return `${httpStatus.value}`
})

const description = computed<string>(() => {
  if (ApiErrorUtil.isError(props.error)) {
    return props.error.errors?.[0]?.detail ?? i18n.t('error.default_error.description')
  }

  return httpErrorMap.get(`${httpStatus.value}`) ?? i18n.t('error.default_error.title')
})
</script>

<template>
  <div
    class="
      relative flex h-96 min-w-96 items-center justify-center overflow-hidden
    "
  >
    <GridDecorativeBackgroundPattern
      class="
        absolute size-full scale-125 text-gray-200
        dark:text-gray-900
      "
    />

    <div class="relative z-10">
      <span
        class="gap-xl p-xl flex flex-col items-center text-sm font-medium"
      >
        <span
          class="
            border-tertiary px-2xl text-quaternary border-r border-solid text-xl
            tracking-wider whitespace-nowrap
          "
        >
          {{ title }}
        </span>

        <span
          class="
            px-xl text-quaternary min-w-60 font-medium tracking-wider uppercase
          "
        >
          {{ description }}
        </span>
      </span>
    </div>
  </div>
</template>
