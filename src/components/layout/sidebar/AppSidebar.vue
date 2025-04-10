<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import {
  computed,
  ref,
} from 'vue'

import AppSidebarCollapseToggle from '@/components/layout/sidebar/AppSidebarCollapseToggle.vue'
import AppSidebarTop from '@/components/layout/sidebar/AppSidebarTop.vue'
import AppSidebarNavMenu from '@/components/layout/sidebar/navigation/AppSidebarNavMenu.vue'
import { onCreated } from '@/composables/created/created.composable'
import type { UserDetail } from '@/models/user/detail/userDetail.model.ts'
import type {
  NavigationGroup,
  NavigationItem,
} from '@/types/navigationItem.type'
import { CssUnitUtil } from '@/utils/cssUnit.util'

const props = withDefaults(defineProps<{
  bottomItems?: NavigationItem[]
  mainItems: NavigationGroup[]
  user: UserDetail
  variant: 'fixed-sidebar' | 'floating-content' | 'floating-sidebar'
}>(), { bottomItems: () => [] })

const isSidebarCollapsed = useLocalStorage<boolean>('isSidebarCollapsed', false)

const sidebarWidthWhenCollapsedInRem = ref<number>(CssUnitUtil.pxToRem(72))
const sidebarWidthWhenExpandedInRem = ref<number>(CssUnitUtil.pxToRem(256))
const sidebarPaddingXInRem = ref<number>(CssUnitUtil.pxToRem(16))
const sidebarItemPaddingXInRem = ref<number>(CssUnitUtil.pxToRem(10))
const sidebarItemIconSizeInRem = ref<number>(CssUnitUtil.pxToRem(20))

const sidebarWidth = computed<string>(() => {
  if (isSidebarCollapsed.value) {
    return `${sidebarWidthWhenCollapsedInRem.value}rem`
  }

  return `${sidebarWidthWhenExpandedInRem.value}rem`
})

const sidebarItemHeightInRem = computed<number>(() => {
  return sidebarWidthWhenCollapsedInRem.value - sidebarPaddingXInRem.value * 2
})

onCreated(() => {
  if (
    sidebarPaddingXInRem.value * 2 + sidebarItemPaddingXInRem.value * 2 + sidebarItemIconSizeInRem.value
    > sidebarWidthWhenCollapsedInRem.value
  ) {
    throw new Error('Invalid sidebar configuration. Please check the dimensions.')
  }
})
</script>

<template>
  <div
    :class="{
      'px-0': props.variant === 'floating-sidebar' || props.variant === 'floating-content',
      'border-secondary border-r border-solid': props.variant === 'fixed-sidebar',
    }"
    class="sticky top-0 z-20 h-dvh"
  >
    <div
      :class="{
        'rounded-2xl border border-solid': props.variant === 'floating-sidebar',
      }"
      class="h-full"
    >
      <div
        :style="{
          width: sidebarWidth,
          paddingLeft: `${sidebarPaddingXInRem}rem`,
          paddingRight: `${sidebarPaddingXInRem}rem`,
        }"
        class="
          group/sidebar ease-sidebar-collapse relative flex h-full flex-col
          justify-between
          not-motion-reduce:duration-500
        "
      >
        <AppSidebarCollapseToggle v-model="isSidebarCollapsed" />

        <div class="flex h-full flex-col">
          <AppSidebarTop :is-collapsed="isSidebarCollapsed" />

          <AppSidebarNavMenu
            :is-collapsed="isSidebarCollapsed"
            :main-items="props.mainItems"
            :sidebar-item-padding-x-in-rem="sidebarItemPaddingXInRem"
            :sidebar-item-icon-size-in-rem="sidebarItemIconSizeInRem"
            :sidebar-item-height-in-rem="sidebarItemHeightInRem"
            :bottom-items="props.bottomItems"
          />
        </div>
      </div>
    </div>
  </div>
</template>
