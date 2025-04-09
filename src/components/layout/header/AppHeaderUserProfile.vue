<script setup lang="ts">
import {
  useKeyboardShortcut,
  VcAvatar,
  VcButton,
  VcDropdownMenu,
  VcDropdownMenuGroup,
  VcDropdownMenuItem,
  VcDropdownMenuSeparator,
  VcIcon,
  VcKeyboardShortcut,
} from '@wisemen/vue-core-components'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppGroup from '@/components/app/group/AppGroup.vue'
import {
  CURRENT_BUILD_NUMBER,
  CURRENT_ENVIRONMENT,
} from '@/constants/environment.constant.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'
import { UserUtil } from '@/models/user/user.util.ts'

const props = defineProps<{
  user: UserDetail
}>()

const emit = defineEmits<{
  signOut: []
}>()

const i18n = useI18n()

useKeyboardShortcut({
  keys: [
    's',
    'o',
  ],
  onTrigger: onSignOut,
})

const fullName = computed<string | null>(() => {
  if (props.user === null) {
    return null
  }

  return UserUtil.getFullName(props.user)
})

function onSignOut(): void {
  emit('signOut')
}
</script>

<template>
  <VcDropdownMenu
    :is-popover-arrow-hidden="true"
    :popover-side-offset="6"
    popover-align="end"
  >
    <template #trigger>
      <VcButton
        :test-id="TEST_ID.APP_PAGE.USER_BUTTON"
        :class-config="{
          root: 'data-[loading=false]:not-disabled:hover:bg-transparent',
        }"
        variant="tertiary"
      >
        <AppGroup>
          <VcAvatar
            :name="fullName ?? ''"
            :class-config="{
              root: 'size-8 bg-quaternary/50',
              fallback: 'text-xs text-white',
            }"
          />

          <VcIcon
            icon="chevronRight"
            class="size-5 rotate-90 text-white/50"
          />
        </AppGroup>
      </VcButton>
    </template>

    <template #content>
      <div class="min-w-64">
        <div class="px-lg py-lg">
          <span
            :data-test-id="TEST_ID.APP_PAGE.USER_NAME"
            class="text-primary text-sm"
          >
            {{ fullName ?? '-' }}
          </span>
        </div>

        <div class="px-xs">
          <VcDropdownMenuSeparator />
        </div>

        <AppGroup
          class="px-lg py-lg"
          direction="col"
          align="start"
        >
          <span class="text-tertiary block text-sm">
            {{ `${i18n.t('component.sidebar.footer.version')}: ${CURRENT_BUILD_NUMBER}` }}
          </span>

          <span class="text-tertiary block text-sm">
            {{ `${i18n.t('component.sidebar.footer.environment')}: ${CURRENT_ENVIRONMENT}` }}
          </span>
        </AppGroup>

        <div class="px-xs">
          <VcDropdownMenuSeparator />
        </div>

        <VcDropdownMenuGroup>
          <VcDropdownMenuItem
            :label="i18n.t('component.sidebar.footer.sign_out')"
            :is-destructive="true"
            icon="logout"
            @select="onSignOut"
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
