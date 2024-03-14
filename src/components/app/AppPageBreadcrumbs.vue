<script setup lang="ts">
import type { Component } from 'vue'

import type { Breadcrumb } from '@/types/breadcrumb.type'
import { cn } from '@/utils/style.util'

import AppIcon from './icon/AppIcon.vue'
import AppTypedRouterLink from './link/AppTypedRouterLink.vue'
import AppText from './text/AppText.vue'

const props = defineProps<{
  breadcrumbs: Breadcrumb[]
}>()

function getBreadcrumbComponent(breadcrumb: Breadcrumb): Component | string {
  if (breadcrumb.to !== undefined) {
    return AppTypedRouterLink
  }

  return 'div'
}
</script>

<template>
  <div class="flex items-center">
    <template
      v-for="(breadcrumb, i) of props.breadcrumbs"
      :key="breadcrumb.label"
    >
      <Component
        :is="getBreadcrumbComponent(breadcrumb)"
        :to="breadcrumb.to"
        class="max-w-48 outline-muted-foreground"
      >
        <AppText
          :class="
            cn({
              'text-foreground hover:underline': breadcrumb.to !== undefined,
              'text-muted-foreground': breadcrumb.to === undefined,
            })
          "
          class="truncate"
          variant="subtext"
        >
          {{ breadcrumb.label }}
        </AppText>
      </Component>

      <AppIcon
        v-if="i !== props.breadcrumbs.length - 1"
        class="mx-3 mt-px -rotate-90 text-muted-foreground"
        icon="chevronDown"
        size="sm"
      />
    </template>
  </div>
</template>
