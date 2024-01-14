<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'
</script>

<template>
	<Menu>
		<Float
			:flip="true"
			placement="bottom-end"
		>
			<MenuButton
				class="rounded-button p-1 outline-muted-foreground hover:bg-muted-background"
				@click.prevent
			>
				<slot />
			</MenuButton>

			<MenuItems
				as="div"
				class="mt-1 flex min-w-[9rem] flex-col overflow-hidden rounded-md border border-solid border-border bg-background shadow-popover-shadow outline-none"
			>
				<slot name="menu" />
			</MenuItems>
		</Float>
	</Menu>
</template>
