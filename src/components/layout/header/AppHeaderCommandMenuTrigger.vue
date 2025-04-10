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
      bounce: 0.15,
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
            :class-config="{
              root: 'border-primary/30 text-placeholder w-73 justify-start !scale-100 !bg-transparent rounded-full',
            }"
            icon-left="search"
            @click="dialog.open()"
          >
            <template #icon-left>
              <VcButtonIconLeft />
            </template>
            <Motion
              layout-id="dialog-placeholder"
              class="inline-block items-center justify-between text-white/50"
            >
              {{ i18n.t('component.global_search.placeholder') }}
            </Motion>
            <div
              class="ml-5"
            >
              <VcKeyboardShortcut
                v-if="isKeyboardShortcutHintVisible"
                :class-config="{
                  keyboardKey: {
                    key: 'text-white/50',
                  },
                }"
                :keyboard-keys="['meta', 'k']"
              />
            </div>
          </VcButton>
        </VcKeyboardShortcutProvider>
      </Motion>
    </AnimatePresence>
  </MotionConfig>
</template>
