<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { Component } from 'vue'
import { computed, useAttrs } from 'vue'

import type { IconProps } from '@/components/core/icon/appIcon.style'
import { iconVariants } from '@/components/core/icon/appIcon.style'
import type { Icon } from '@/icons'
import { icons } from '@/icons'

interface Props {
	/**
	 * The icon to display.
	 */
	icon: Icon

	/**
	 * The size of the icon.
	 */
	size?: IconProps['size']
}

const { icon, size = 'default' } = defineProps<Props>()

const attrs = useAttrs()

const iconComponent = computed<Component>(() => icons[icon])
</script>

<template>
	<Component
		:is="iconComponent"
		:class="twMerge(iconVariants({ size }), attrs?.class as string)"
	/>
</template>
