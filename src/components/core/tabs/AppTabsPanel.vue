<script setup lang="ts">
import { TabPanel } from '@headlessui/vue'

defineSlots<{
	/**
	 * Slot inside of TabPanel, should contain panel content.
	 */
	default: void
}>()
</script>

<template>
	<TabPanel class="text-foreground">
		<slot />
	</TabPanel>
</template>
