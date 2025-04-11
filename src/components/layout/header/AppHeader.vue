<script setup lang="ts">
import AppSeparator from '@/components/app/AppSeparator.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppHeaderSettings from '@/components/layout/header/AppHeaderSettings.vue'
import AppHeaderUserProfile from '@/components/layout/header/AppHeaderUserProfile.vue'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'

const props = defineProps<{
  user: UserDetail
}>()

const emit = defineEmits<{
  signOut: []
}>()

function onSignOut(): void {
  emit('signOut')
}
</script>

<template>
  <AppGroup
    justify="between"
    class="p-md min-h-12"
  >
    <div id="header-left" />

    <AppGroup gap="lg">
      <AppHeaderSettings />

      <AppSeparator
        class="!bg-fg-quaternary !h-7"
        direction="vertical"
      />

      <AppHeaderUserProfile
        :user="props.user"
        @sign-out="onSignOut"
      />
    </AppGroup>
  </AppGroup>
</template>
