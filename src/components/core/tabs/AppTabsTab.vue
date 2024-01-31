<script setup lang="ts">
import { Tab } from '@headlessui/vue'
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink } from 'vue-router'

import { tabVariants } from '@/components/core/tabs/appTabs.style'
import { fadeTransition } from '@/transitions'

const { to } = defineProps<{
	/**
	 * Whether the tab is active.
	 */
	isActive: boolean
	/**
	 * Route name to link to.
	 */
	to?: RouteLocationRaw
}>()
defineSlots<{
	/**
	 * Slot inside of Tab, should contain Tab.
	 */
	default: void
}>()

const isRouter = computed<boolean>(() => !!to)
</script>

<template>
	<Component
		:is="isRouter ? RouterLink : Tab"
		class="relative flex flex-1"
		:class="tabVariants()"
		:to="to"
	>
		<slot />
		<Transition v-bind="fadeTransition">
			<div
				v-if="isActive"
				class="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-primary"
			/>
		</Transition>
	</Component>
</template>
