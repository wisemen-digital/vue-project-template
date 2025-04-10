<script setup lang="ts">
import {
  useVcDialog,
  VcDropdownMenu,
  VcDropdownMenuGroup,
  VcDropdownMenuItem,
  VcKeyboardShortcut,
} from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'
import { UserUtil } from '@/models/user/user.util'

const props = defineProps<{
  isCollapsed: boolean
  sidebarItemHeightInRem: number
  user: UserDetail
}>()

const emit = defineEmits<{
  signOut: []
}>()

const i18n = useI18n()

const settingsDialog = useVcDialog({ component: () => import('@/modules/settings/dialogs/SettingsDialog.vue') })

const fullName = computed<string | null>(() => {
  if (props.user === null) {
    return null
  }

  return UserUtil.getFullName(props.user)
})

const userInitials = computed<string | null>(() => {
  if (fullName.value === null) {
    return null
  }

  return UserUtil.getInitials(fullName.value)
})
</script>

<template>
  <VcDropdownMenu
    :enable-global-keyboard-shortcuts="true"
    :is-arrow-hidden="true"
    :popover-offset-in-px="10"
    popover-side="right"
    popover-align="end"
  >
    <template #trigger>
      <AppUnstyledButton
        :data-test-id="TEST_ID.APP_PAGE.USER_BUTTON"
        :aria-label="i18n.t('component.sidebar.footer.user_profile')"
        type="button"
        class="
          gap-x-xl ring-brand-primary-500 flex w-full items-center rounded-full
          text-left outline-none
        "
      >
        <div
          :style="{
            height: `${props.sidebarItemHeightInRem}rem`,
          }"
          class="
            bg-quaternary flex aspect-square items-center justify-center
            rounded-full
          "
        >
          <span class="text-primary text-sm font-medium">
            {{ userInitials ?? '?' }}
          </span>
        </div>

        <div
          :style="{
            height: `${props.sidebarItemHeightInRem}rem`,
          }"
          class="relative size-full"
        >
          <Transition
            enter-active-class="not-motion-reduce:duration-500 ease-sidebar-collapse"
            leave-active-class="not-motion-reduce:duration-500 ease-sidebar-collapse"
            leave-to-class="opacity-0 -translate-x-4 scale-90"
            enter-from-class="opacity-0 -translate-x-4 scale-90"
          >
            <div
              v-if="!props.isCollapsed"
              :data-test-id="TEST_ID.APP_PAGE.USER_NAME"
              class="
                absolute top-1/2 flex w-full -translate-y-1/2 flex-col
                items-start overflow-hidden
              "
            >
              <span
                class="
                  text-primary w-full truncate text-left text-sm font-semibold
                "
              >
                {{ fullName ?? '-' }}
              </span>

              <span class="text-secondary w-full truncate text-sm">
                {{ props.user.email ?? '-' }}
              </span>
            </div>
          </Transition>
        </div>
      </AppUnstyledButton>
    </template>
    <template #content>
      <div class="pb-xs min-w-56">
        <span class="px-lg py-md text-primary block text-sm">
          {{ fullName ?? '-' }}
        </span>

        <AppSeparator />

        <div class="px-lg py-md">
          <span class="text-tertiary block text-sm">
            {{ `${i18n.t('component.sidebar.footer.version')}: ${CURRENT_BUILD_NUMBER}` }}
          </span>

          <span class="mt-sm text-tertiary block text-sm">
            {{ `${i18n.t('component.sidebar.footer.environment')}: ${CURRENT_ENVIRONMENT}` }}
          </span>
        </div>

        <AppSeparator />
        <VcDropdownMenuGroup>
          <VcDropdownMenuItem
            :keyboard-keys="[
              'g',
              's',
            ]"
            :label="i18n.t('module.settings.title')"
            icon="settings"
            @select="() => settingsDialog.open()"
          >
            <template #right>
              <VcKeyboardShortcut
                :keyboard-keys="['g', 's']"
              />
            </template>
          </VcDropdownMenuItem>
          <VcDropdownMenuItem
            :is-destructive="true"
            :keyboard-keys="[
              's',
              'o',
            ]"
            :label="i18n.t('component.sidebar.footer.sign_out')"
            icon="logout"
            @select="emit('signOut')"
          >
            <template #right>
              <VcKeyboardShortcut
                :keyboard-keys="['s', 'o']"
                :class-config="{
                  keyboardKey: {
                    key: 'bg-transparent shadow-none bg-error-primary text-error-primary group-data-highlighted/dropdown-menu-item:bg-error-secondary duration-200',
                  },
                  thenLabel: 'text-error-primary',
                }"
              />
            </template>
          </VcDropdownMenuItem>
        </VcDropdownMenuGroup>
      </div>
    </template>
  </VcDropdownMenu>
</template>
