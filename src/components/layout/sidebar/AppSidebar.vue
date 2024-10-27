<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'

import AppSidebarBottom from '@/components/layout/sidebar/AppSidebarBottom.vue'
import AppSidebarCollapseToggle from '@/components/layout/sidebar/AppSidebarCollapseToggle.vue'
import AppSidebarTop from '@/components/layout/sidebar/AppSidebarTop.vue'
import AppSidebarNavMenu from '@/components/layout/sidebar/navigation/AppSidebarNavMenu.vue'
import { onCreated } from '@/composables/created/created.composable'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import type {
  NavigationGroup,
  NavigationItem,
} from '@/types/navigationItem.type'

const props = withDefaults(defineProps<{
  authUser: AuthUser
  bottomItems?: NavigationItem[]
  mainItems: NavigationGroup[]
  variant: 'fixed-sidebar' | 'floating-content' | 'floating-sidebar'
}>(), {
  bottomItems: () => [],
})

const emit = defineEmits<{
  signOut: []
}>()

const isSidebarCollapsed = useLocalStorage<boolean>('isSidebarCollapsed', false)

const sidebarWidthWhenCollapsedInPx = ref<number>(72)
const sidebarWidthWhenExpandedInPx = ref<number>(256)
const sidebarPaddingXInPx = ref<number>(16)
const sidebarItemPaddingXInPx = ref<number>(8)
const sidebarItemIconSizeInPx = ref<number>(24)

const sidebarWidth = computed<string>(() => {
  if (isSidebarCollapsed.value) {
    return `${sidebarWidthWhenCollapsedInPx.value}px`
  }

  return `${sidebarWidthWhenExpandedInPx.value}px`
})

const sidebarItemHeightInPx = computed<number>(() => {
  return sidebarWidthWhenCollapsedInPx.value - sidebarPaddingXInPx.value * 2
})

function onSignOut(): void {
  emit('signOut')
}

onCreated(() => {
  if (
    sidebarPaddingXInPx.value * 2 + sidebarItemPaddingXInPx.value * 2 + sidebarItemIconSizeInPx.value
    > sidebarWidthWhenCollapsedInPx.value
  ) {
    throw new Error('Invalid sidebar configuration. Please check the dimensions.')
  }
})
</script>

<template>
  <div
    :class="{
      'p-xl': props.variant === 'floating-sidebar' || props.variant === 'floating-content',
      'border-r border-solid border-secondary': props.variant === 'fixed-sidebar',
    }"
    class="sticky top-0 h-dvh"
  >
    <div
      :class="{
        'rounded-2xl border border-solid border-secondary': props.variant === 'floating-sidebar',
        'px-lg': props.variant === 'fixed-sidebar',
      }"
      class="h-full bg-secondary"
    >
      <div
        :style="{
          width: sidebarWidth,
          paddingLeft: `${sidebarPaddingXInPx}px`,
          paddingRight: `${sidebarPaddingXInPx}px`,
        }"
        class="group/sidebar relative flex h-full flex-col justify-between duration-500 ease-sidebar-collapse"
      >
        <AppSidebarCollapseToggle v-model="isSidebarCollapsed" />

        <div class="flex h-full flex-col">
          <AppSidebarTop :is-collapsed="isSidebarCollapsed" />

          <AppSidebarNavMenu
            :is-collapsed="isSidebarCollapsed"
            :main-items="props.mainItems"
            :sidebar-item-padding-x-in-px="sidebarItemPaddingXInPx"
            :sidebar-item-icon-size-in-px="sidebarItemIconSizeInPx"
            :sidebar-item-height-in-px="sidebarItemHeightInPx"
            :bottom-items="props.bottomItems"
          />
        </div>

        <AppSidebarBottom
          :is-collapsed="isSidebarCollapsed"
          :sidebar-item-height-in-px="sidebarItemHeightInPx"
          :auth-user="props.authUser"
          @sign-out="onSignOut"
        />
      </div>
    </div>
  </div>
</template>
