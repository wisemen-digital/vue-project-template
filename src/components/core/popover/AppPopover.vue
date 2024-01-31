<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'

import { popoverTransition } from '@/transitions'
import type { FloatProps } from '@/types/core/float.type'

export interface PopoverProps extends FloatProps {
	/**
	 * Decides if the popover state is managed from the outside.
	 */
	isManual?: boolean
	/**
	 * Decides if the popover element is a div or a button.
	 */
	isDiv?: boolean
}

const {
	placement = 'bottom',
	hasAdaptiveWidth = false,
	hasAutoPlacement = false,
	hasNoFlip = false,
	hasNoOffset = false,
	hasNoShift = false,
	isDiv = false,
	isManual = false,
} = defineProps<PopoverProps>()

const SHIFT_VALUE = 8
const OFFSET_VALUE = 4
const FLIP_VALUE = 8

const isOpen = defineModel<boolean>({
	default: false,
})

function closeManual(): void {
	isOpen.value = false
}
</script>

<template>
	<Popover>
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
			<PopoverButton
				:as="isDiv ? 'div' : 'button'"
				class="max-w-max rounded-button"
			>
				<slot name="element" />
			</PopoverButton>

			<PopoverPanel
				v-if="!isManual"
				v-slot="{ close }"
				class="rounded-popover border border-border bg-popover px-4 py-3 text-popover-foreground shadow-popover-shadow"
				:focus="true"
			>
				<slot
					:close="close"
					name="panel"
				/>
			</PopoverPanel>
			<PopoverPanel
				v-else
				v-show="isOpen"
				class="rounded-popover border border-border bg-popover px-4 py-3 text-popover-foreground shadow-popover-shadow"
				:focus="true"
				static
			>
				<slot
					:close="closeManual"
					name="panel"
				/>
			</PopoverPanel>
		</Float>
	</Popover>
</template>
