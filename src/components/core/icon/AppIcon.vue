<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { Component } from 'vue'
import { computed, useAttrs } from 'vue'

import type { IconProps } from '@/components/core/icon/appIcon.style'
import { iconVariants } from '@/components/core/icon/appIcon.style'
import type { Icon } from '@/icons/icons'
import { icons } from '@/icons/icons'

const { icon, size = 'default' } = defineProps<{
	/**
	 * The icon to display.
	 */
	icon: Icon

	/**
	 * The size of the icon.
	 */
	size?: IconProps['size']
}>()

const attrs = useAttrs()

const iconComponent = computed<Component>(() => icons[icon])
</script>

<template>
	<Component
		:is="iconComponent"
		:class="twMerge(iconVariants({ size }), attrs?.class as string)"
	/>
</template>
