<script setup lang="ts">
interface Props {
  message: string | null
  status: number
}

const { message, status } = defineProps<Props>()

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

console.error(message)
</script>

<template>
  <AppText
    class="flex items-center p-4"
    variant="subtext"
  >
    <span
      class="border-r border-solid border-neutral-200 px-4 tracking-wider text-muted-foreground/75"
    >
      {{ status }}
    </span>

    <span class="px-4 uppercase tracking-wider text-muted-foreground/75">
      {{ httpErrorMap.get(`${status}`) ?? t('suspense.something_went_wrong') }}
    </span>
  </AppText>
</template>
