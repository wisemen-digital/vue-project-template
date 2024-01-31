<script setup lang="ts">
import { TabPanels } from '@headlessui/vue'

defineSlots<{
	/**
	 * Slot inside of TabPanel, should contain TabPanels.
	 */
	default: void
}>()
</script>

<template>
	<TabPanels>
		<slot />
	</TabPanels>
</template>
