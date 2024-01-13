<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <AppButton
    :to="{
      name: 'login-form',
    }"
    class="w-full"
  >
    {{ t('auth.features.return_to_login') }}
  </AppButton>
</template>
