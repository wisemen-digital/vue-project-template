<script setup lang="ts">
import AppAvatar from '@/components/app/avatar/AppAvatar.vue'
import AppIcon from '@/ui/components/icon/AppIcon.vue'
</script>

<template>
	<div class="flex h-[50px] w-full items-center justify-between gap-2 border-red-500 px-8">
		<AppIcon icon="logo" />

		<div class="mr-auto flex items-center">
			<div>Users</div>
			<div>Example</div>
		</div>
		<AppAvatar />
	</div>
</template>
