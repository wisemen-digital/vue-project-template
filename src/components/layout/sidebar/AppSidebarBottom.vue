<script setup lang="ts">
import AppSeparator from '@/components/app/AppSeparator.vue'
import AppSidebarUserProfile from '@/components/layout/sidebar/AppSidebarUserProfile.vue'
import type { AuthUser } from '@/models/auth-user/authUser.model'

const props = defineProps<{
  isCollapsed: boolean
  authUser: AuthUser
  sidebarItemHeightInRem: number
}>()

const emit = defineEmits<{
  signOut: []
}>()

function onSignOut(): void {
  emit('signOut')
}
</script>

<template>
  <div class="mb-3xl">
    <AppSeparator class="my-xl" />

    <AppSidebarUserProfile
      :is-collapsed="props.isCollapsed"
      :sidebar-item-height-in-rem="props.sidebarItemHeightInRem"
      :auth-user="props.authUser"
      @sign-out="onSignOut"
    />
  </div>
</template>
