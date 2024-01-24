<script setup lang="ts">
import { computed } from 'vue'

import type { Icon } from '@/icons/icon.type.ts'
import AppIcon from '@/ui/components/icon/AppIcon.vue'
import AppLoader from '@/ui/components/loader/AppLoader.vue'

import type { ButtonProps } from './appButton.style'
import { buttonIcon } from './appButton.style'

interface Props {
	icon: Icon
	isLoading: boolean
	size: ButtonProps['size']
	variant: ButtonProps['variant']
}

const { isLoading, size } = defineProps<Props>()

const buttonIconClasses = computed<string>(() =>
	buttonIcon({
		size,
	})
)
</script>

<template>
	<div
		v-if="isLoading"
		class="relative"
		:class="buttonIconClasses"
	>
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<AppLoader class="size-4" />
		</div>
	</div>

	<AppIcon
		v-else
		:class="buttonIconClasses"
		:icon="icon"
	/>
</template>
