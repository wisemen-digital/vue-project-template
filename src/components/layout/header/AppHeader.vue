<script setup lang="ts">
import { useVcDialog } from '@wisemen/vue-core-components'

import AppSeparator from '@/components/app/AppSeparator.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppHeaderCommandMenuTrigger from '@/components/layout/header/AppHeaderCommandMenuTrigger.vue'
import AppHeaderSettings from '@/components/layout/header/AppHeaderSettings.vue'
import AppHeaderUserProfile from '@/components/layout/header/AppHeaderUserProfile.vue'
import { useCommandMenuAction } from '@/components/layout/header/commandAction.composable.ts'
import { CommandMenuAction } from '@/components/layout/header/commandMenuAction.type.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'

const props = defineProps<{
  user: UserDetail
}>()

const emit = defineEmits<{
  signOut: []
}>()

const settingsDialog = useVcDialog({ component: () => import('@/modules/settings/dialogs/SettingsDialog.vue') })

useCommandMenuAction({
  action: (): void => {
    settingsDialog.open()
  },
  key: CommandMenuAction.SETTINGS_APPEARANCE,
})

function onSignOut(): void {
  emit('signOut')
}
</script>

<template>
  <div
    class="p-md grid min-h-12 grid-cols-3"
  >
    <div id="header-left" />

    <div class="flex w-full justify-center">
      <AppHeaderCommandMenuTrigger />
    </div>

    <AppGroup
      justify="end"
      class="bg-err"
    >
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
  </div>
</template>
