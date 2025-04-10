<script setup lang="ts">
import {
  VcDialogContent,
  VcDialogDescription,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogRoot,
  VcDialogTitle,
} from '@wisemen/vue-core-components'
import {
  Motion,
  MotionConfig,
} from 'motion-v'
import {
  ListboxContent,
  ListboxFilter,
  ListboxItem,
  ListboxRoot,
} from 'reka-ui'
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import type { CommandMenuItem } from '@/components/layout/header/commandMenu.composable.ts'
import { useCommandMenu } from '@/components/layout/header/commandMenu.composable.ts'

const emit = defineEmits<{
  close: []
}>()
const i18n = useI18n()

const commandMenu = useCommandMenu()

function onHighlight(uuid: string | undefined): void {
  commandMenu.onHighlight(uuid ?? null)
}

function onClick(item: CommandMenuItem): void {
  onClose()
  commandMenu.onClick(item)
}

function onClose(): void {
  emit('close')
}
</script>

<template>
  <VcDialogRoot
    :class-config="{
      content: 'top-4 translate-y-0 rounded-none bg-brand-950/80 border-primary/50 px-lg',
    }"
    @close="onClose"
  >
    <VcDialogOverlay>
      <VcDialogOverlayTransition />
    </VcDialogOverlay>

    <MotionConfig
      :transition="{
        duration: 0.5,
        type: 'spring',
        bounce: 0.15,
      }"
    >
      <VcDialogContent>
        <Motion
          :animate="{
            borderRadius: '15px',
          }"
          layout-id="dialog"
          class="w-150"
        >
          <VcDialogTitle
            class="sr-only"
          >
            <p>{{ i18n.t('component.global_search.dialog.aria_title') }}</p>
          </VcDialogTitle>
          <VcDialogDescription
            class="sr-only"
          >
            <p>{{ i18n.t('component.global_search.dialog.aria_description') }}</p>
          </VcDialogDescription>

          <div class="relative">
            <ListboxRoot @highlight="(payload) => onHighlight(payload?.value?.toString())">
              <ListboxFilter as-child>
                <div class="bg-error-500">
                  SEARCH
                </div>
              </ListboxFilter>

              <div
                class="p-lg"
              >
                <Motion
                  class="bg-success-500"
                  layout
                >
                  RECENT
                </Motion>
                <ListboxContent class="flex flex-col">
                  <Motion>
                    <ListboxItem
                      v-for="(item) in 2"
                      :key="item"
                      :value="item"
                      :as-child="true"
                    >
                      <Motion
                        :as-child="true"
                      >
                        <div class="bg-warning-500">
                          ITEM
                        </div>
                      </Motion>
                    </ListboxItem>
                  </Motion>
                </ListboxContent>
              </div>
            </ListboxRoot>
            <AppSeparator
              class="my-sm !bg-white/50"
              direction="horizontal"
            />

            <div class="bg-error-500">
              SHORTCUTS
            </div>
          </div>
        </Motion>
      </VcDialogContent>
    </MotionConfig>
  </VcDialogRoot>
</template>
