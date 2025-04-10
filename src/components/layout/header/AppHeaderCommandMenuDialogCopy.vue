<script setup lang="ts">
import {
  VcDialogContent,
  VcDialogDescription,
  VcDialogOverlay,
  VcDialogOverlayTransition,
  VcDialogRoot,
  VcDialogTitle,
  VcIcon,
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
import AppGroup from '@/components/app/group/AppGroup.vue'
import AppCommandMenuShortcut from '@/components/layout/header/AppCommandMenuShortcut.vue'
import AppHeaderCommandMenuRecentResultsLabel from '@/components/layout/header/AppHeaderCommandMenuRecentResultsLabel.vue'
import AppHeaderCommandMenuSearchField from '@/components/layout/header/AppHeaderCommandMenuSearchField.vue'
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
                <AppHeaderCommandMenuSearchField
                  v-model="commandMenu.searchTerm.value"
                  :is-loading="commandMenu.isFetching.value"
                />
              </ListboxFilter>

              <div
                v-if="
                  (commandMenu.searchTerm.value.length > 0 || commandMenu.recentSearches.value.length > 0)
                    && commandMenu.items.value.length > 0"
                class="p-lg"
              >
                <AppHeaderCommandMenuRecentResultsLabel
                  v-if="commandMenu.recentSearches.value.length > 0 && commandMenu.searchTerm.value.length === 0"
                  @clear="commandMenu.clearRecentSearches()"
                />
                <p
                  v-if="commandMenu.items.value.length === 0
                    && commandMenu.searchTerm.value.length > 0
                    && !commandMenu.isFetching.value"
                  class="pt-lg text-sm"
                >
                  {{ i18n.t('component.global_search.no_results_found_for', { value: commandMenu.searchTerm.value }) }}
                </p>
                <ListboxContent class="flex flex-col">
                  <Motion
                    layout-id="dialog-list"
                  >
                    <ListboxItem
                      v-for="(item) in commandMenu.items.value"
                      :key="item.id"
                      :as-child="true"
                      :value="item.id"
                      @click="onClick(item)"
                    >
                      <Motion
                        :layout-id="item.id"
                        :as-child="true"
                      >
                        <RouterLink
                          :to="item.to"
                          :class="{
                            'bg-brand-100/10 data-[highlighted]:border-primary/20': commandMenu.isHighlighted(item.id),
                          }"
                          class="
                            gap-md p-md flex items-center rounded-lg border
                            border-transparent
                          "
                        >
                          <div
                            :class="{
                              'bg-brand-600': commandMenu.isHighlighted(item.id),
                              'bg-white/10': !commandMenu.isHighlighted(item.id),
                            }"
                            class="p-md w-min rounded-lg"
                          >
                            <VcIcon
                              :icon="item.icon"
                              class="size-5 text-white"
                            />
                          </div>
                          <div>
                            <span class="text-sm font-medium text-white"> {{ item.label }}</span>
                            <AppGroup>
                              <template
                                v-for="(breadcrumb, index) in item.breadcrumbs"
                                :key="index"
                              >
                                <span class="text-xs text-white">{{ breadcrumb }}</span>
                                <VcIcon
                                  v-if="index !== item.breadcrumbs.length - 1"
                                  icon="chevronRight"
                                  class="text-brand-500 size-4"
                                />
                              </template>
                            </AppGroup>
                          </div>
                        </RouterLink>
                      </Motion>
                    </ListboxItem>
                  </Motion>
                </ListboxContent>
              </div>
            </ListboxRoot>
            <AppSeparator
              v-if="
                (commandMenu.searchTerm.value.length > 0 || commandMenu.recentSearches.value.length > 0)
                  && commandMenu.items.value.length > 0"
              class="my-sm !bg-white/50"
              direction="horizontal"
            />
            <Motion
              layout-id="dialog-shortcuts"
            >
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
            </Motion>
          </div>
        </Motion>
      </VcDialogContent>
    </MotionConfig>
  </VcDialogRoot>
</template>
