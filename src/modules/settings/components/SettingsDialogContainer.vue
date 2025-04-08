<script setup lang="ts">
import {
  VcIcon,
  VcIconButton,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import type { SettingsNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'

const props = withDefaults(defineProps<{
  title: string
  navigation: SettingsNavigation
  subTitle?: string | null
}>(), { subTitle: null })

const i18n = useI18n()

function onNavigateBack(): void {
  props.navigation.onBack()
}

function onNavigateForward(): void {
  props.navigation.onForward()
}
</script>

<template>
  <div class="flex w-full flex-1 flex-col overflow-x-hidden">
    <div class="px-lg py-xl border-primary flex items-center border-b">
      <VcIconButton
        :label="i18n.t('shared.navigate_back')"
        :is-disabled="props.navigation.isBackDisabled.value"
        icon="chevronLeft"
        size="sm"
        variant="tertiary"
        @click="onNavigateBack"
      />
      <VcIconButton
        :label="i18n.t('shared.navigate_forward')"
        :is-disabled="props.navigation.isForwardDisabled.value"
        size="sm"
        icon="chevronRight"
        variant="tertiary"
        @click="onNavigateForward"
      />
      <h2 class="px-md text-primary font-bold">
        {{ props.title }}
      </h2>
      <Transition
        enter-active-class="duration-300 ease-sidebar-collapse"
        leave-active-class="duration-300 ease-sidebar-collapse"
        enter-from-class="opacity-0 -translate-x-8"
        leave-to-class="opacity-0 -translate-x-8"
      >
        <div
          v-if="subTitle !== null"
          class="flex items-center"
        >
          <VcIcon
            class="text-quaternary size-4"
            icon="chevronRight"
          />
          <h3
            class="px-md text-primary font-medium"
          >
            {{ props.subTitle }}
          </h3>
        </div>
      </Transition>
    </div>

    <div class="flex flex-1 flex-col overflow-y-auto">
      <slot />
    </div>
  </div>
</template>
