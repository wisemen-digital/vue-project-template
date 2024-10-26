<script setup lang="ts">
import {
  AppDropdownMenu,
  AppThemeProvider,
  type DropdownMenuItem,
  useDarkMode,
  useTypedRouter,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import AppSeparator from '@/components/app/AppSeparator.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import { useAuthStore } from '@/stores/auth.store.ts'

const props = defineProps<{
  isCollapsed: boolean
}>()

const authStore = useAuthStore()

const { t } = useI18n()
const darkMode = useDarkMode()
const router = useTypedRouter()

const authUser = computed<AuthUser | null>(() => authStore.authUser)

const dropdownMenuItems = computed<DropdownMenuItem[]>(() => [
  {
    icon: darkMode.isEnabled.value ? 'sun' : 'moonStar',
    label: darkMode.isEnabled.value
      ? t('component.sidebar.footer.switch_to_light_mode')
      : t('component.sidebar.footer.switch_to_dark_mode'),
    type: 'option',
    onSelect: (): void => {
      if (darkMode.isEnabled.value) {
        darkMode.disable()
      }
      else {
        darkMode.enable()
      }
    },
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
      authStore.logout()

      void router.replace({
        name: 'login',
      })
    },
  },
])
</script>

<template>
  <div v-if="authUser !== null">
    <div class="px-xl">
      <AppSeparator class="" />
    </div>

    <div class="p-xl">
      <AppThemeProvider theme="dark">
        <AppDropdownMenu
          :items="dropdownMenuItems"
          :enable-global-keyboard-shortcuts="true"
          :is-arrow-hidden="true"
          :offset-in-px="-5"
          side="right"
          align="end"
        >
          <template #content-top>
            <div class="min-w-56 pb-xs">
              <span class="block px-lg py-md text-subtext text-primary">
                {{ authUser.fullName }}
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

          <template #trigger>
            <button
              type="button"
              class="flex w-full items-center gap-x-xl rounded-full p-none outline-none ring-brand-primary-500 ring-offset-1 duration-200 focus-visible:ring-2"
            >
              <div class="size-12 shrink-0 rounded-full bg-brand-primary" />

              <div class="relative size-full">
                <Transition
                  enter-active-class="duration-300"
                  leave-active-class="duration-300"
                  leave-to-class="opacity-0 -translate-x-4"
                  enter-from-class="opacity-0 -translate-x-4"
                >
                  <div
                    v-if="!props.isCollapsed"
                    class="absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-start overflow-hidden"
                  >
                    <span class="w-full truncate text-left text-subtext font-semibold text-primary">
                      {{ authUser.fullName }}
                    </span>

                    <span class="w-full truncate text-subtext text-secondary">
                      {{ authUser.email }}
                    </span>
                  </div>
                </Transition>
              </div>
            </button>
          </template>
        </AppDropdownMenu>
      </AppThemeProvider>
    </div>
  </div>
</template>
