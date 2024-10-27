<script setup lang="ts">
import {
  AppDropdownMenu,
  AppDropdownMenuTrigger,
  AppThemeProvider,
  type DropdownMenuItem,
  useDarkMode,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import AppSeparator from '@/components/app/AppSeparator.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant'
import type { AuthUser } from '@/models/auth-user/authUser.model'

const props = defineProps<{
  isCollapsed: boolean
  authUser: AuthUser
  sidebarItemHeightInPx: number
}>()

const emit = defineEmits<{
  signOut: []
}>()

const { t } = useI18n()
const darkMode = useDarkMode()

const dropdownMenuItems = computed<DropdownMenuItem[]>(() => [
  {
    icon: 'settings01',
    keyboardKeys: [
      'g',
      's',
    ],
    label: t('module.settings.title'),
    to: {
      name: 'settings-overview',
    },
    type: 'route',
  },
  {
    type: 'separator',
  },
  {
    icon: 'logOut01',
    keyboardKeys: [
      's',
      'o',
    ],
    label: t('component.sidebar.footer.sign_out'),
    type: 'option',
    onSelect: (): void => {
      emit('signOut')
    },
  },
])
</script>

<template>
  <AppThemeProvider theme="dark">
    <AppDropdownMenu
      :items="dropdownMenuItems"
      :enable-global-keyboard-shortcuts="true"
      :is-arrow-hidden="true"
      :offset-in-px="10"
      side="right"
      align="end"
    >
      <template #content-top>
        <div class="min-w-56 pb-xs">
          <span class="block px-lg py-md text-subtext text-primary">
            {{ props.authUser.fullName }}
          </span>

          <AppSeparator />

          <div class="px-lg py-md">
            <span class="block text-subtext text-tertiary">
              {{ `${t('component.sidebar.footer.version')}: ${CURRENT_BUILD_NUMBER}` }}
            </span>

            <span class="mt-1 block text-subtext text-tertiary">
              {{ `${t('component.sidebar.footer.environment')}: ${CURRENT_ENVIRONMENT}` }}
            </span>
          </div>

          <AppSeparator />
        </div>
      </template>

      <AppThemeProvider :theme="darkMode.isEnabled.value ? 'dark' : 'light'">
        <AppDropdownMenuTrigger>
          <button
            type="button"
            class="flex w-full items-center gap-x-xl rounded-full text-left outline-none ring-brand-primary-500 ring-offset-1 duration-200 focus-visible:ring-2"
          >
            <div
              :style="{
                height: `${props.sidebarItemHeightInPx}px`,
              }"
              class="aspect-square rounded-full bg-quaternary"
            />

            <div
              :style="{
                height: `${props.sidebarItemHeightInPx}px`,
              }"
              class="relative size-full"
            >
              <Transition
                enter-active-class="duration-500 ease-sidebar-collapse"
                leave-active-class="duration-500 ease-sidebar-collapse"
                leave-to-class="opacity-0 -translate-x-4 scale-90"
                enter-from-class="opacity-0 -translate-x-4 scale-90"
              >
                <div
                  v-if="!props.isCollapsed"
                  class="absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-start overflow-hidden"
                >
                  <span class="w-full truncate text-left text-subtext font-semibold leading-5 text-primary">
                    {{ props.authUser.fullName }}
                  </span>

                  <span class="w-full truncate text-subtext leading-5 text-secondary">
                    {{ props.authUser.email }}
                  </span>
                </div>
              </Transition>
            </div>
          </button>
        </AppDropdownMenuTrigger>
      </AppThemeProvider>
    </AppDropdownMenu>
  </AppThemeProvider>
</template>
