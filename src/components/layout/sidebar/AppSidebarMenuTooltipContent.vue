<script setup lang="ts">
import {
  AppKeyboardShortcut,
  AppText,
} from '@wisemen/vue-core'
import type { NavigationItemOption } from 'node_modules/@wisemen/vue-core/dist/types/navigationItem.type'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  isOpen: boolean
  navigationItem: NavigationItemOption
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex items-center gap-x-2 px-2 py-1.5">
    <AppText
      variant="caption"
      class="text-muted-foreground"
    >
      {{ t('components.sidebar.go_to') }} <span class="lowercase">{{ props.navigationItem.label }}</span>
    </AppText>

    <AppKeyboardShortcut
      v-if="props.navigationItem.keyboardShortcut !== undefined"
      :keys="props.navigationItem.keyboardShortcut.keys"
      variant="bordered"
    />
  </div>
</template>
