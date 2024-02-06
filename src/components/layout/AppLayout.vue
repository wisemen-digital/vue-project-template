<script setup lang="ts">
import AppNavbar from '@/components/app/navbar/AppNavbar.vue'
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<AppNavbar />
		<RouterView />
	</div>
</template>
