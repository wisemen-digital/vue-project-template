<script setup lang="ts">
import type { DropdownMenuItem } from '@wisemen/vue-core'
import {
  AppButton,
  AppDropdownMenu,
  AppText,
  useTypedRouter,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDivider from '@/components/app/AppDivider.vue'
import AppAvatar from '@/components/app/avatar/AppAvatar.vue'
import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useTypedRouter()

const currentUser = computed<CurrentUser | null>(() => authStore.currentUser)

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
  authStore.logout()

  void router.replace({
    name: 'login',
  })
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
            :first-name="currentUser.firstName"
            :last-name="currentUser.lastName"
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
