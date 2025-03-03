<script setup lang="ts">
import {
  type Icon,
  VcDialog,
  VcDialogCloseButton,
  VcDialogTitle,
  VcIcon,
} from '@wisemen/vue-core'
import { VisuallyHidden } from 'reka-ui'
import {
  type Component,
  computed,
  ref,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
import AppUnstyledButton from '@/components/app/AppUnstyledButton.vue'
import AppAsyncComponent from '@/components/app/async-component/AppAsyncComponent.vue'
import AppTextHighlight from '@/components/app/text-highlight/AppTextHighlight.vue'
import { useSettingNavigation } from '@/modules/setting/composables/settingNavigation.composable.ts'
import type { SettingKey } from '@/modules/setting/types/settingKey.type.ts'

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

const menuItems = computed<MenuItemGroup<SettingKey>[]>(() => {
  return [
    {
      title: i18n.t('module.setting.general_settings'),
      items: [
        // {
        //   title: i18n.t('module.setting.account'),
        //   icon: 'settings',
        //   key: 'account',
        //   component: import('@/modules/setting/features/components/account/SettingAccount.vue'),
        // },
        {
          title: i18n.t('module.setting.notifications.title'),
          icon: 'notification',
          key: 'notifications',
          component: import('@/modules/setting/features/components/notifications/SettingNotifications.vue'),
        },
        {
          title: i18n.t('module.setting.roles_and_permissions'),
          icon: 'shield',
          key: 'rolesPermissions',
          component: import('@/modules/setting/features/components/permissions/SettingRoleAndPermission.vue'),
        },
        {
          title: i18n.t('module.setting.appearance'),
          icon: 'brush',
          key: 'appearance',
          component: import('@/modules/setting/features/components/appearance/SettingAppearance.vue'),
        },
      ],
    },
  ]
})

const searchInput = ref<string>('')

const navigation = useSettingNavigation({
  default: 'notifications',
})

const activeMenuItem = computed<SettingKey>(() => navigation.currentItem.value.item)

const filteredMenuItems = computed<MenuItemGroup<SettingKey>[]>(() => {
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

function isActive(key: SettingKey): boolean {
  return activeMenuItem.value === key
}

const activeComponent = computed<{ key: string, component: Promise<Component> } | null>(() => {
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

function onMenuItemClick(key: SettingKey): void {
  navigation.onNavigate(key)
}
</script>

<template>
  <VcDialog class="max-w-[90vw] lg:max-w-[70vw] size-full flex my-4xl max-h-[80vh]">
    <div class="absolute right-2 top-2">
      <VcDialogCloseButton />
    </div>

    <div class="bg-tertiary py-xl flex flex-col gap-xl w-full overflow-y-auto shrink-0 max-w-[16rem] border-r border-secondary px-2xl">
      <div class="flex flex-col gap-xl">
        <VisuallyHidden>
          <VcDialogTitle>
            <h1 class="text-lg font-bold text-primary">
              {{ i18n.t('module.setting.title') }}
            </h1>
          </VcDialogTitle>
        </VisuallyHidden>

        <AppSearchInputField
          v-model="searchInput"
          :placeholder="i18n.t('component.select.search_placeholder')"
        />
      </div>

      <div
        v-for="group in filteredMenuItems"
        :key="group.title"
        class="flex flex-col gap-lg"
      >
        <span class="text-tertiary uppercase text-xs font-semibold">{{ group.title }}</span>
        <div class="-mx-xs flex flex-col gap-sm">
          <AppUnstyledButton
            v-for="item in group.items"
            :key="item.key"
            class="flex gap-lg p-xxs w-full rounded-lg group transition-all items-center cursor-pointer"
            @click="onMenuItemClick(item.key)"
          >
            <span
              :class="{
                'bg-brand-solid border-brand text-primary-on-brand': isActive(item.key),
                'bg-primary border-primary text-primary': !isActive(item.key),
              }"
              class="flex group-hover:border-brand items-center justify-center p-md border rounded-lg"
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
              class="text-sm group-hover:text-primary font-medium"
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
