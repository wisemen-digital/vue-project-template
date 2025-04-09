<script setup lang="ts">
import {
  useVcDialog,
  VcButton,
  VcButtonIconLeft,
  VcKeyboardShortcut,
  VcKeyboardShortcutProvider,
} from '@wisemen/vue-core-components'
import {
  AnimatePresence,
  Motion,
  MotionConfig,
} from 'motion-v'
import { useI18n } from 'vue-i18n'

import { useKeyboardShortcutVisibilityValue } from '@/composables/keyboard-shortcut-visibility/keyboardShortcutVisibility.composable'

const i18n = useI18n()
const isKeyboardShortcutHintVisible = useKeyboardShortcutVisibilityValue()

const dialog = useVcDialog({ component: () => import('@/components/layout/header/AppHeaderCommandMenuDialog.vue') })
</script>

<template>
  <MotionConfig
    :transition="{
      duration: 0.5,
      type: 'spring',
      bounce: 0.2,
    }"
  >
    <AnimatePresence>
      <Motion
        v-if="!dialog.isOpen()"
        layout-id="dialog"
      >
        <VcKeyboardShortcutProvider
          :keyboard-keys="['meta', 'k']"
          class="w-full"
        >
          <VcButton
            class-config="{
              root: 'border-primary text-placeholder w-72 justify-start !scale-100 !bg-white',
            }"
            icon-left="search"
            @click="dialog.open()"
          >
            <template #icon-left>
              <Motion
                layout-id="dialog-icon"
                class="text-white/50"
              >
                <VcButtonIconLeft />
              </Motion>
            </template>
            <Motion
              layout-id="dialog-placeholder"
              class="inline-block items-center justify-between text-white/50"
            >
              {{ i18n.t('component.global_search.placeholder') }}
            </Motion>
            <Motion
              layout-id="dialog-shortcut"
              class="ml-7"
            >
              <VcKeyboardShortcut
                v-if="isKeyboardShortcutHintVisible"
                :class-config="{
                  root: 'border-white text-white',
                  keyboardKey: {
                    key: 'text-white/50 border-white',
                  },
                }"
                :keyboard-keys="['meta', 'k']"
              />
            </Motion>
          </VcButton>
        </VcKeyboardShortcutProvider>
      </Motion>
    </AnimatePresence>
  </MotionConfig>
</template>
