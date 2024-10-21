<script setup lang="ts">
import type { DropdownMenuItem } from '@wisemen/vue-core'
import {
  AppAvatar,
  AppButton,
  AppDropdownMenu,
  AppText,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDivider from '@/components/app/AppDivider.vue'
import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'
import type { AuthUser } from '@/models/auth/current-user/currentUser.model'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
const authStore = useAuthStore()

const currentUser = computed<AuthUser | null>(() => authStore.currentUser)
const currentUserAvatarFallback = computed<string>(() => {
  if (authStore.currentUser === null) {
    return '-'
  }

  return authStore.currentUser?.firstName.slice(0, 1) + authStore.currentUser?.lastName.slice(0, 1)
})

const dropdownMenuItems: DropdownMenuItem[] = [
  {
    items: [
      {
        icon: 'logout',
        keyboardShortcutKeys: [
          's',
          'o',
        ],
        label: t('components.sidebar.footer.sign_out'),
        type: 'selectOption',
        onSelect: onSignOutButtonClick,
      },
    ],
    type: 'group',
  },
]

function onSignOutButtonClick(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}
</script>

<template>
  <div v-if="currentUser !== null">
    <AppDropdownMenu
      :items="dropdownMenuItems"
      :enable-global-keyboard-shortcuts="true"
      side="top"
      align="start"
    >
      <template #default>
        <AppButton
          size="unset"
          variant="ghost"
          class="rounded-full ring-offset-0"
        >
          <AppAvatar
            :src="null"
            :fallback="currentUserAvatarFallback"
          />
        </AppButton>
      </template>

      <template #header>
        <div class="min-w-80">
          <AppText
            variant="subtext"
            class="p-3"
          >
            {{ currentUser.fullName }}
          </AppText>

          <AppDivider />

          <div class="p-3">
            <AppText
              variant="subtext"
              class="text-muted-foreground"
            >
              {{ `${t('components.sidebar.footer.version')}: ${CURRENT_BUILD_NUMBER}` }}
            </AppText>

            <AppText
              variant="subtext"
              class="mt-1 text-muted-foreground"
            >
              {{ `${t('components.sidebar.footer.environment')}: ${CURRENT_ENVIRONMENT}` }}
            </AppText>
          </div>

          <AppDivider />
        </div>
      </template>
    </AppDropdownMenu>
  </div>
</template>
