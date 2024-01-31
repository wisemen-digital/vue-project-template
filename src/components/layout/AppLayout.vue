<script setup lang="ts">
import AppNavbar from '@/components/app/navbar/AppNavbar.vue'
</script>

<template>
	<div>
		<AppNavbar />
		<div class="flex flex-1 items-center">
			<RouterView />
		</div>
	</div>
</template>
