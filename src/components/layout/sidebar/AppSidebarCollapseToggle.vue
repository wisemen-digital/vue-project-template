<script setup lang="ts">
import {
  VcIcon,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcToggle,
  VcTooltip,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

const isCollapsed = defineModel<boolean>({ required: true })

const i18n = useI18n()

const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()

const toggleBtnLabel = computed<string>(() => {
  if (isCollapsed.value) {
    return i18n.t('component.sidebar.open_sidebar')
  }

  return i18n.t('component.sidebar.close_sidebar')
})
</script>

<template>
  <div class="absolute top-4 right-0">
    <VcKeyboardShortcutProvider
      v-slot="{ keys }"
      :config="{
        keys: ['c'],
      }"
    >
      <VcTooltip
        :is-arrow-hidden="true"
        :delay-duration="500"
        side="right"
      >
        <template #trigger>
          <VcToggle v-model="isCollapsed">
            <AppUnstyledButton
              :aria-label="toggleBtnLabel"
              class="
                border-secondary bg-secondary text-fg-disabled ring-fg-tertiary
                flex h-10 w-5 translate-x-1/2 items-center justify-center
                rounded-2xl border border-solid opacity-0 outline-none
                group-hover/sidebar:opacity-100
                focus-visible:opacity-100
              "
            >
              <VcIcon
                :class="{
                  'rotate-180': isCollapsed,
                }"
                class="duration-300"
                icon="chevronLeft"
              />
            </AppUnstyledButton>
          </VcToggle>
        </template>

        <template #content>
          <div class="gap-x-md px-md py-sm flex items-center">
            <span class="text-xs text-white">
              {{ toggleBtnLabel }}
            </span>

            <VcKeyboardShortcut
              v-if="isKeyboardShortcutHintVisible"
              :keyboard-keys="keys"
              keyboard-classes="bg-white/10 text-white"
            />
          </div>
        </template>
      </VcTooltip>
    </VcKeyboardShortcutProvider>
  </div>
</template>
