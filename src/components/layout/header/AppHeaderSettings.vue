<script setup lang="ts">
import {
  useVcDialog,
  VcIconButton,
  VcKeyboardShortcutProvider,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import AppButtonTooltip from '@/components/app/tooltip/AppButtonTooltip.vue'

const i18n = useI18n()

const settingsDialog = useVcDialog({ component: () => import('@/modules/settings/dialogs/SettingsDialog.vue') })
</script>

<template>
  <VcKeyboardShortcutProvider :keyboard-keys="['meta', ',']">
    <AppButtonTooltip
      :label="i18n.t('component.sidebar.settings')"
      :keyboard-shortcut-keys="['meta', ',']"
    >
      <VcIconButton
        :label="i18n.t('component.sidebar.settings')"

        variant="tertiary"
        icon="settings"
        @click="settingsDialog.open()"
      />
    </AppButtonTooltip>
  </VcKeyboardShortcutProvider>
</template>
