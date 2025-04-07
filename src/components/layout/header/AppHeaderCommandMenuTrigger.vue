<script setup lang="ts">
import {
  VcIcon,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
  VcPopover,
} from '@wisemen/vue-core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppHeaderCommandMenu from '@/components/layout/header/AppHeaderCommandMenu.vue'
import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

const { t } = useI18n()
const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()

const isOpen = ref<boolean>(false)

function onSelect(): void {
  isOpen.value = false
}
</script>

<template>
  <VcKeyboardShortcutProvider
    v-slot="{ keys }"
    :config="{
      keys: ['meta', 'k'],
      stopPropagation: true,
    }"
  >
    <VcPopover
      v-model:is-open="isOpen"
      :is-arrow-hidden="true"
      :popover-offset-in-px="-40"
      popover-side="bottom"
      class="bg-fg-primary border-transparent shadow-lg backdrop-blur-md"
    >
      <template #trigger>
        <AppUnstyledButton
          class="
            hover:border-brand-500
            py-sm px-lg ring-offset-brand-800 max-w-120 min-w-full rounded-full
            border border-white/10 bg-white/10
          "
        >
          <AppGroup gap="lg">
            <VcIcon
              icon="search"
              class="text-placeholder size-4"
            />

            <span class="text-placeholder">
              {{ t('component.header.search') }}
            </span>

            <VcKeyboardShortcut
              v-if="isKeyboardShortcutHintVisible"
              :keyboard-keys="keys"
              keyboard-classes="bg-white/10 text-white/75"
              class="ml-auto"
            />
          </AppGroup>
        </AppUnstyledButton>
      </template>

      <template #content>
        <AppHeaderCommandMenu @select="onSelect" />
      </template>
    </VcPopover>
  </VcKeyboardShortcutProvider>
</template>
