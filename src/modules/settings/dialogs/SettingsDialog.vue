<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core-components'
import {
  VcDialog,
  VcDialogCloseButton,
  VcDialogTitle,
  VcIcon,
} from '@wisemen/vue-core-components'
import { VisuallyHidden } from 'reka-ui'
import type { Component } from 'vue'
import {
  computed,
  ref,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppAsyncComponent from '@/components/app/async-component/AppAsyncComponent.vue'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import AppSearchInputField from '@/components/app/search/AppSearchInputField.vue'
import AppTextHighlight from '@/components/app/text-highlight/AppTextHighlight.vue'
import { useSettingsNavigation } from '@/modules/settings/composables/settingsNavigation.composable.ts'
import type { SettingsMenuItemKey } from '@/modules/settings/types/settingsMenuItemKey.type.ts'

const emit = defineEmits<{
  close: []
}>()

const i18n = useI18n()

interface MenuItem<TKey> {
  title: string
  icon: Icon
  key: TKey
  component: Promise<Component>
}

interface MenuItemGroup<TKey> {
  title: string
  items: MenuItem<TKey>[]
}

const menuItems = computed<MenuItemGroup<SettingsMenuItemKey>[]>(() => {
  return [
    {
      title: i18n.t('module.settings.general_settings'),
      items: [
        {
          title: i18n.t('module.settings.appearance'),
          icon: 'brush',
          key: 'appearance',
          component: import('@/modules/settings/features/appearance/views/SettingsAppearanceView.vue'),
        },
        {
          title: i18n.t('module.settings.roles_and_permissions'),
          icon: 'shield',
          key: 'rolesPermissions',
          component: import('@/modules/settings/features/roles-and-permissions/views/SettingsRoleAndPermissionView.vue'),
        },
      ],
    },
    {
      title: i18n.t('module.settings.system.title'),
      items: [
        {
          title: i18n.t('module.settings.event_logs.title'),
          icon: 'file',
          key: 'eventLogs',
          component: import('@/modules/settings/features/event-logs/views/SettingsEventLogsView.vue'),
        },
      ],
    },
  ]
})

const searchInput = ref<string>('')

const navigation = useSettingsNavigation({ default: 'appearance' })

const activeMenuItem = computed<SettingsMenuItemKey>(() => navigation.currentItem.value.item)

const filteredGroupMenuItems = computed<MenuItemGroup<SettingsMenuItemKey>[]>(() => {
  const search = searchInput.value.toLowerCase()

  return menuItems.value
    .map((group) => {
      const filteredItems = group.items.filter((item) => {
        return item.title.toLowerCase().includes(search)
      })

      return {
        ...group,
        items: filteredItems,
      }
    })
    .filter((group) => group.items.length > 0)
})

function isActive(key: SettingsMenuItemKey): boolean {
  return activeMenuItem.value === key
}

const activeComponent = computed<{ key: string
  component: Promise<Component> } | null>(() => {
  const item = menuItems.value
    .flatMap((group) => group.items)
    .find((item) => isActive(item.key))

  if (item === undefined) {
    return null
  }

  return {
    key: item.key,
    component: item.component,
  }
})

function onMenuItemClick(key: SettingsMenuItemKey): void {
  navigation.onNavigate(key)
}
</script>

<template>
  <VcDialog
    class="
      my-4xl flex size-full max-h-[80vh] max-w-[90vw]
      lg:max-w-[70vw]
    "
    @close="emit('close')"
  >
    <div class="absolute top-2 right-2">
      <VcDialogCloseButton />
    </div>

    <div
      class="
        bg-tertiary py-xl gap-xl border-secondary px-2xl flex w-full
        max-w-[16rem] shrink-0 flex-col overflow-y-auto border-r
      "
    >
      <div class="gap-xl flex flex-col">
        <VisuallyHidden>
          <VcDialogTitle>
            <h1 class="text-primary text-lg font-bold">
              {{ i18n.t('module.settings.title') }}
            </h1>
          </VcDialogTitle>
        </VisuallyHidden>

        <AppSearchInputField
          v-model="searchInput"
          :placeholder="i18n.t('component.select.search_placeholder')"
        />
      </div>

      <div
        v-for="group in filteredGroupMenuItems"
        :key="group.title"
        class="gap-lg flex flex-col"
      >
        <span class="text-tertiary text-xs font-semibold uppercase">{{ group.title }}</span>
        <div class="-mx-xs gap-sm flex flex-col">
          <AppUnstyledButton
            v-for="item in group.items"
            :key="item.key"
            class="
              gap-lg p-xxs group flex w-full cursor-pointer items-center
              rounded-lg transition-all
            "
            @click="onMenuItemClick(item.key)"
          >
            <span
              :class="{
                'bg-brand-solid border-brand text-primary-on-brand': isActive(item.key),
                'bg-primary border-primary text-primary': !isActive(item.key),
              }"
              class="
                group-hover:border-brand
                p-md flex items-center justify-center rounded-lg border
              "
            >
              <VcIcon
                :icon="item.icon"
                class="size-3"
              />
            </span>
            <span
              :class="{
                'text-primary': isActive(item.key),
                'text-tertiary': !isActive(item.key),
              }"
              class="
                group-hover:text-primary
                text-sm font-medium
              "
            >
              <AppTextHighlight
                :search-term="searchInput"
                :text-to-highlight="item.title"
              />
            </span>
          </AppUnstyledButton>
        </div>
      </div>
    </div>

    <AppAsyncComponent
      v-if="activeComponent"
      :key="activeComponent.key"
      :navigation="navigation"
      :component="activeComponent.component"
    />
  </VcDialog>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
