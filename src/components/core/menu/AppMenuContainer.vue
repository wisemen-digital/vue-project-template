<script setup lang="ts">
import { Menu } from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'

import type { FloatProps } from '@/models/core/float.model'
import { popoverTransition } from '@/transitions'

const {
	placement = 'bottom-end',
	hasAdaptiveWidth = false,
	hasAutoPlacement = false,
	hasNoFlip = false,
	hasNoOffset = false,
	hasNoShift = false,
} = defineProps<FloatProps>()

const SHIFT_VALUE = 8
const OFFSET_VALUE = 4
const FLIP_VALUE = 8
</script>

<template>
	<Menu>
		<Float
			:adaptive-width="hasAdaptiveWidth"
			:auto-placement="hasAutoPlacement"
			:flip="hasNoFlip ? undefined : FLIP_VALUE"
			:offset="hasNoOffset ? undefined : OFFSET_VALUE"
			:placement="placement"
			portal
			:shift="hasNoShift ? undefined : SHIFT_VALUE"
			v-bind="popoverTransition"
			tailwindcss-origin-class
		>
			<slot />
		</Float>
	</Menu>
</template>
