<script setup lang="ts">
import type { Placement } from '@floating-ui/dom'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'

interface Props {
	position?: Placement
	isDark?: boolean
}

const { position, isDark = false } = defineProps<Props>()
</script>

<template>
	<Popover>
		<Float
			:placement="position ?? 'bottom'"
			:portal="true"
		>
			<PopoverButton class="outline-none">
				<slot />
			</PopoverButton>

			<PopoverPanel
				v-slot="{ open, close }"
				as="div"
				class="rounded-lg shadow-popover-shadow outline-none"
				:class="[isDark ? 'bg-foreground' : 'bg-background']"
			>
				<slot
					v-if="open"
					:close="close"
					name="popover"
				/>
			</PopoverPanel>
		</Float>
	</Popover>
</template>
