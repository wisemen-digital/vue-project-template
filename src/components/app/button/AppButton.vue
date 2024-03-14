<script setup lang="ts" generic="T extends keyof Routes">
import type { ButtonHTMLAttributes } from 'vue'
import { computed, useAttrs } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import AppLoader from '@/components/app/loader/AppLoader.vue'
import type { Icon } from '@/icons/icons'
import type { Routes } from '@/routes/routes'
import type { RouteLocationTyped } from '@/types/router/router.type'

import AppTypedRouterLink from '../link/AppTypedRouterLink.vue'
import type { ButtonProps } from './appButton.style'
import { button } from './appButton.style'
import AppButtonIconOrLoader from './AppButtonIconOrLoader.vue'

export interface Props<T extends keyof Routes> extends /* @vue-ignore */ ButtonHTMLAttributes {
  /**
   * The URL to navigate to when the button is clicked.
   * If defined, renders an `<a>` element instead of a `button` element.
   */
  href?: null | string

  /**
   * Specifies the icon to display on the left side of the button.
   */
  iconLeft?: Icon | null

  /**
   * Specifies the icon to display on the right side of the button.
   */
  iconRight?: Icon | null

  /**
   * Whether the button is disabled or not.
   * If true, the button is disabled and cannot be clicked.
   */
  isDisabled?: boolean

  /**
   * Whether to show a loading indicator and disable the button.
   * If true, the button is disabled and a loading indicator is displayed.
   */
  isLoading?: boolean

  /**
   * Determines the size of the button. Available options are:
   * Values are 'default', 'sm', 'lg'
   */
  size?: ButtonProps['size']

  /**
   * The route to navigate to when the button is clicked.
   * If defined, renders a `<RouterLink>` element instead of an `<a>` element.
   */
  to?: RouteLocationTyped<T> | null

  /**
   * The type of the native button element. Defaults to 'button'.
   * Values are 'button', 'reset', and 'submit'.
   */
  type?: 'button' | 'reset' | 'submit'

  /**
   * Determines the visual style of the button. Available options are:
   * Values are 'default', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning'
   */
  variant?: ButtonProps['variant']
}

const {
  href = null,
  iconLeft = null,

  iconRight = null,
  isDisabled = false,

  isLoading = false,
  size = 'default',

  to = null,
  type = 'button',

  variant = 'default',
} = defineProps<Props<T>>()

const attrs = useAttrs()

const buttonClasses = computed<string>(() =>
  button({
    class: attrs.class as string,
    isLoading,
    size,
    variant,
  }),
)

const componentType = computed<string | typeof AppTypedRouterLink>(() => {
  if (to !== null) {
    return AppTypedRouterLink
  }
  else if (href !== null) {
    return 'a'
  }

  return 'button'
})

const componentProps = computed<Record<string, unknown>>(() => {
  if (componentType.value === 'a') {
    return {
      class: buttonClasses.value,
      href: href as string,
      rel: 'noopener noreferrer',
      target: '_blank',
    }
  }

  if (componentType.value === AppTypedRouterLink) {
    return {
      class: buttonClasses.value,
      to: to as RouteLocationRaw,
    }
  }

  return {
    class: buttonClasses.value,
    disabled: isDisabled || isLoading,
    type,
  }
})
</script>

<template>
  <!-- Not casting `componentProps` to `any` throws a ts error on build -->
  <Component
    :is="componentType"
    v-bind="componentProps as any"
  >
    <AppButtonIconOrLoader
      v-if="iconLeft !== null"
      :icon="iconLeft"
      :is-loading="isLoading"
      :size="size"
      :variant="variant"
    />

    <span
      :class="{
        'opacity-0': isLoading && iconLeft === null && iconRight === null,
      }"
      class="whitespace-nowrap"
    >
      <slot />
    </span>

    <div
      v-if="isLoading && iconLeft === null && iconRight === null"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <AppLoader class="size-5" />
    </div>

    <AppButtonIconOrLoader
      v-if="iconRight !== null"
      :icon="iconRight"
      :is-loading="isLoading"
      :size="size"
      :variant="variant"
    />
  </Component>
</template>
