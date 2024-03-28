<script setup lang="ts">
import { AppText } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="space-y-4">
    <AppText variant="title">
      {{ t('auth.check_your_email') }}
    </AppText>

    <AppText variant="body">
      {{ t('auth.check_your_email_description') }}
    </AppText>
  </div>
</template>
