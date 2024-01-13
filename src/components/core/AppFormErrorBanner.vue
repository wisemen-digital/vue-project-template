<script setup lang="ts">
import type { Form } from 'formango'

interface Props {
  form: Form<any>
}

const { form } = defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <AppHeightTransition :duration="200">
    <div v-if="form.hasAttemptedToSubmit && form.errors != null && form.errors._errors != null">
      <div
        class="mb-4 flex items-center rounded-input border border-solid border-destructive bg-destructive/5 px-4 py-3"
      >
        <AppIcon
          icon="warning"
          class="h-5 w-5 flex-shrink-0 text-destructive"
        />

        <AppText
          variant="subtext"
          class="ml-4 max-w-sm text-destructive"
        >
          {{ t('core.one_or_more_fields_are_invalid_please') }}
        </AppText>
      </div>
    </div>
  </AppHeightTransition>
</template>
