<script setup lang="ts">
import AppMenu from '@/ui/components/menu/AppMenu.vue'
import AppMenuItem from '@/ui/components/menu/AppMenuItem.vue'
</script>

<template>
	<div>
		<div>Profile</div>
		<AppMenu>
			<template #default> test </template>
			<template #menu>
				<AppMenuItem>test</AppMenuItem>
			</template>
		</AppMenu>
	</div>
</template>
