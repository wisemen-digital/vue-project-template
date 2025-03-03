<script setup lang="ts">
import { VcIcon, VcIconButton } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import type { SettingNavigation } from '@/modules/setting/composables/settingNavigation.composable.ts'

const props = withDefaults(defineProps<{
  title: string
  navigation: SettingNavigation
  subTitle?: string | null
}>(), {
  subTitle: null,
})

const i18n = useI18n()

function onNavigateBack(): void {
  props.navigation.onBack()
}

function onNavigateForward(): void {
  props.navigation.onForward()
}
</script>

<template>
  <div class="flex flex-1 w-full flex-col overflow-x-hidden">
    <div class="flex px-lg border-b py-xl border-primary items-center">
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
      <h2 class="px-md font-bold text-primary">
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
            class="size-4 text-quaternary"
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

    <div class="overflow-y-auto flex flex-col flex-1">
      <slot />
    </div>
  </div>
</template>
