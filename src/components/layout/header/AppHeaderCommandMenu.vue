<script setup lang="ts">
import {
  VcIcon,
  VcTextField,
} from '@wisemen/vue-core-components'
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
  select: [void]
}>()

const i18n = useI18n()

const commandMenu = useCommandMenu()

function onHighlight(uuid: string | undefined): void {
  commandMenu.onHighlight(uuid ?? null)
}

function onClick(item: CommandMenuItem): void {
  emit('select')
  commandMenu.onClick(item)
}
</script>

<template>
  <div class="p-lg h-min max-h-120 w-120 rounded-lg text-white">
    <ListboxRoot @highlight="(payload) => onHighlight(payload?.value?.toString())">
      <ListboxFilter as-child>
        <VcTextField
          v-model="commandMenu.searchTerm.value"
          :is-loading="commandMenu.isFetching.value"
          :placeholder="i18n.t('component.global_search.placeholder')"
          :style-config="{
            '--text-field-shadow-default': 'none',
            '--text-field-border-bottom-color-default': 'transparent',
            '--text-field-border-top-color-default': 'transparent',
            '--text-field-border-right-color-default': 'transparent',
            '--text-field-border-left-color-default': 'transparent',
            '--text-field-bg-color-default': 'transparent',
            '--text-field-bg-color-focus': 'transparent',
            '--text-field-bg-color-hover': 'transparent',
            '--text-field-text-color-default': 'var(--text-primary-on-brand)',
            '--text-field-text-color-hover': 'var(--text-primary-on-brand)',
            '--text-field-text-color-focus': 'var(--text-primary-on-brand)',
          }"
          icon-left="search"
        />
      </ListboxFilter>
      <AppSeparator
        v-if="commandMenu.items.value.length > 0"
        class="my-md bg-white/10"
        direction="horizontal"
      />
      <AppGroup
        v-if="commandMenu.recentSearches.value.length > 0 && commandMenu.searchTerm.value.length === 0"
        align="center"
        class="mb-md"
        justify="between"
      >
        <p
          class="text-primary-on-brand text-xs"
        >
          {{ i18n.t('component.global_search.recent_results') }}
        </p>
        <AppUnstyledButton
          class="
            text-xs text-white/80
            hover:text-white
          "
          @click="commandMenu.clearRecentSearches()"
        >
          {{ i18n.t('component.search_input.clear') }}
        </AppUnstyledButton>
      </AppGroup>
      <p
        v-if="commandMenu.items.value.length === 0
          && commandMenu.searchTerm.value.length > 0
          && !commandMenu.isFetching.value"
        class="pt-lg text-sm text-white/80"
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
              'bg-white/10 data-[highlighted]:border-white/20': commandMenu.isHighlighted(item.id),
            }"
            class="
              gap-md p-md flex items-center rounded-lg border border-transparent
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
                class="text-primary-on-brand size-5"
              />
            </div>
            <div>
              <span class="text-primary-on-brand text-sm font-medium"> {{ item.label }}</span>
              <AppGroup>
                <template
                  v-for="(breadcrumb, index) in item.breadcrumbs"
                  :key="index"
                >
                  <span class="text-secondary-on-brand text-xs">{{ breadcrumb }}</span>
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
    </ListboxRoot>
    <AppSeparator
      class="my-md bg-white/10"
      direction="horizontal"
    />
    <AppGroup justify="between">
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
</template>
