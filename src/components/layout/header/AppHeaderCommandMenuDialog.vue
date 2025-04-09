<script setup lang="ts">
import {
  VcDialogContent,
  VcDialogDescription,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogRoot,
  VcDialogTitle,
  VcIcon,
  VcKeyboardShortcut,
  VcTextField,
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
import { RouterLink } from 'vue-router'

import AppSeparator from '@/components/app/AppSeparator.vue'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppCommandMenuShortcut from '@/components/layout/header/AppCommandMenuShortcut.vue'
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
  console.log('close')
  onClose()
  commandMenu.onClick(item)
}

function onClose(): void {
  emit('close')
}
</script>

<template>
  <VcDialogRoot
    @close="onClose"
  >
    <VcDialogOverlay>
      <VcDialogOverlayTransition />
    </VcDialogOverlay>

    <MotionConfig
      :transition="{
        duration: 0.5,
        type: 'spring',
        bounce: 0.2,
      }"
    >
      <VcDialogContent>
        <Motion
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
                <VcTextField
                  v-model="commandMenu.searchTerm.value"
                  :is-loading="commandMenu.isFetching.value"
                  :placeholder="i18n.t('component.global_search.placeholder')"
                  :class-config="{
                    input: 'pl-md text-md',
                    root: 'border-0 shadow-none outline-none h-auto px-xl py-2xl border-b border-solid !border-primary rounded-none',
                  }"
                >
                  <template #left>
                    <VcIcon
                      icon="search"
                      class="ml-lg text-tertiary size-5"
                    />
                  </template>

                  <template #right>
                    <div
                      class="mr-md"
                    >
                      <VcKeyboardShortcut :keyboard-keys="['meta', 'k']" />
                    </div>
                  </template>
                </VcTextField>
              </ListboxFilter>
              <div
                v-if="commandMenu.searchTerm.value.length > 0 || commandMenu.recentSearches.value.length > 0"
                class="p-lg"
              >
                <AppGroup
                  v-if="commandMenu.recentSearches.value.length > 0 && commandMenu.searchTerm.value.length === 0"
                  align="center"
                  class="mb-md"
                  justify="between"
                >
                  <p
                    class="text-xs"
                  >
                    {{ i18n.t('component.global_search.recent_results') }}
                  </p>
                  <AppUnstyledButton
                    class="text-xs"
                    @click="commandMenu.clearRecentSearches()"
                  >
                    {{ i18n.t('component.search_input.clear') }}
                  </AppUnstyledButton>
                </AppGroup>
                <p
                  v-if="commandMenu.items.value.length === 0
                    && commandMenu.searchTerm.value.length > 0
                    && !commandMenu.isFetching.value"
                  class="pt-lg text-sm"
                >
                  {{ i18n.t('component.global_search.no_results_found_for', { value: commandMenu.searchTerm.value }) }}
                </p>
                <ListboxContent class="flex flex-col">
                  <ListboxItem
                    v-for="(item) in commandMenu.items.value"
                    :key="item.id"
                    :as-child="true"
                    :value="item.id"
                    @click="onClick(item)"
                  >
                    <RouterLink
                      :to="item.to"
                      :class="{
                        'bg-primary/10 data-[highlighted]:border-primary': commandMenu.isHighlighted(item.id),
                      }"
                      class="
                        gap-md p-md flex items-center rounded-lg border
                        border-transparent
                      "
                    >
                      <div
                        :class="{
                          'bg-brand-500': commandMenu.isHighlighted(item.id),
                          'bg-brand-300': !commandMenu.isHighlighted(item.id),
                        }"
                        class="p-md w-min rounded-lg"
                      >
                        <VcIcon
                          :icon="item.icon"
                          class="text-primary size-5"
                        />
                      </div>
                      <div>
                        <span class="text-primary text-sm font-medium"> {{ item.label }}</span>
                        <AppGroup>
                          <template
                            v-for="(breadcrumb, index) in item.breadcrumbs"
                            :key="index"
                          >
                            <span class="text-primary text-xs">{{ breadcrumb }}</span>
                            <VcIcon
                              v-if="index !== item.breadcrumbs.length - 1"
                              icon="chevronRight"
                              class="text-brand-500 size-4"
                            />
                          </template>
                        </AppGroup>
                      </div>
                    </RouterLink>
                  </ListboxItem>
                </ListboxContent>
              </div>
            </ListboxRoot>
            <AppSeparator
              v-if="commandMenu.searchTerm.value.length > 0 || commandMenu.recentSearches.value.length > 0"
              class="my-md bg-fg-primary"
              direction="horizontal"
            />
            <AppGroup
              class="p-lg"
              justify="between"
            >
              <AppCommandMenuShortcut icon="arrowUp" />
              <AppCommandMenuShortcut
                :label="i18n.t('shared.navigate')"
                icon="arrowDown"
              />
              <AppCommandMenuShortcut
                :label="i18n.t('shared.select')"
                icon="enterKey"
              />
              <AppCommandMenuShortcut
                :label="i18n.t('shared.close')"
                class="ml-auto"
                icon="escKey"
              />
            </AppGroup>
          </div>
        </Motion>
      </VcDialogContent>
    </MotionConfig>
  </VcDialogRoot>
</template>
