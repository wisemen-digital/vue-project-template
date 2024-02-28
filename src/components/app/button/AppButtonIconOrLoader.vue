<script setup lang="ts">
import { computed } from 'vue'

import type { ButtonProps } from '@/components/app/button/appButton.style'
import { buttonIcon } from '@/components/app/button/appButton.style'
import type { Icon } from '@/icons/icons'

import AppIcon from '../icon/AppIcon.vue'
import AppLoader from '../loader/AppLoader.vue'

const props = defineProps<{
	icon: Icon
	isLoading: boolean
	size: ButtonProps['size']
	variant: ButtonProps['variant']
}>()

const buttonIconClasses = computed<string>(() =>
	buttonIcon({
		size: props.size,
	})
)
</script>

<template>
	<div
		v-if="props.isLoading"
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
		:icon="props.icon"
	/>
</template>
