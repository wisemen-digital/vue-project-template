<script setup lang="ts">
import { MenuItems } from '@headlessui/vue'
</script>

<template>
	<MenuItems
		class="max-w-max overflow-hidden rounded-popover border border-border bg-popover text-popover-foreground shadow-popover-shadow"
	>
		<slot />
	</MenuItems>
</template>
