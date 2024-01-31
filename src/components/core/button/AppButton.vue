<script setup lang="ts" generic="T extends keyof Routes">
import type { ButtonHTMLAttributes } from 'vue'
import { computed, useAttrs } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import AppButtonIconOrLoader from '@/components/core/button/AppButtonIconOrLoader.vue'
import AppTypedRouterLink from '@/components/core/link/AppTypedRouterLink.vue'
import AppLoader from '@/components/core/loader/AppLoader.vue'
import type { Icon } from '@/icons/icon.type.ts'
import type { RouteLocationTyped } from '@/plugins/router/router.plugin.ts'
import type { Routes } from '@/plugins/router/routes.ts'

import type { ButtonProps } from './appButton.style'
import { button } from './appButton.style'

export interface Props<T extends keyof Routes> extends /* @vue-ignore */ ButtonHTMLAttributes {
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
	 * Determines the visual style of the button. Available options are:
	 * Values are 'default', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning'
	 */
	variant?: ButtonProps['variant']

	/**
	 * Determines the size of the button. Available options are:
	 * Values are 'default', 'sm', 'lg'
	 */
	size?: ButtonProps['size']

	/**
	 * Specifies the icon to display on the left side of the button.
	 */
	iconLeft?: Icon | null

	/**
	 * Specifies the icon to display on the right side of the button.
	 */
	iconRight?: Icon | null

	/**
	 * The route to navigate to when the button is clicked.
	 * If defined, renders a `<RouterLink>` element instead of an `<a>` element.
	 */
	to?: RouteLocationTyped<T> | null

	/**
	 * The URL to navigate to when the button is clicked.
	 * If defined, renders an `<a>` element instead of a `button` element.
	 */
	href?: string | null

	/**
	 * The type of the native button element. Defaults to 'button'.
	 * Values are 'button', 'reset', and 'submit'.
	 */
	type?: 'button' | 'reset' | 'submit'
}

const {
	isDisabled = false,
	isLoading = false,

	variant = 'default',
	size = 'default',

	iconLeft = null,
	iconRight = null,

	to = null,
	href = null,

	type = 'button',
} = defineProps<Props<T>>()

const attrs = useAttrs()

const buttonClasses = computed<string>(() =>
	button({
		size,
		variant,
		isLoading,
		class: attrs.class as string,
	})
)

const componentType = computed<string | typeof AppTypedRouterLink>(() => {
	if (to !== null) {
		return AppTypedRouterLink
	} else if (href !== null) {
		return 'a'
	}

	return 'button'
})

const componentProps = computed<Record<string, unknown>>(() => {
	if (componentType.value === 'a') {
		return {
			href: href as string,
			target: '_blank',
			rel: 'noopener noreferrer',
			class: buttonClasses.value,
		}
	}

	if (componentType.value === AppTypedRouterLink) {
		return {
			to: to as RouteLocationRaw,
			class: buttonClasses.value,
		}
	}

	return {
		type,
		disabled: isDisabled || isLoading,
		class: buttonClasses.value,
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
			class="whitespace-nowrap"
			:class="{
				'opacity-0': isLoading && iconLeft === null && iconRight === null,
			}"
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
