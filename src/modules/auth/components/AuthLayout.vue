<script setup lang="ts">
import AppImage from '@/components/core/image/AppImage.vue'
</script>
<template>
	<div class="grid h-screen grid-cols-1 md:grid-cols-2">
		<div class="flex flex-col justify-center px-6 py-20">
			<div class="mx-auto w-full max-w-[360px]">
				<RouterView />
			</div>
		</div>

		<div class="relative hidden h-full items-center justify-end px-6 py-6 md:flex">
			<AppImage
				class="h-full max-w-[800px] overflow-hidden rounded-card"
				src="src/assets/images/studaro_space_cowboy.png"
			/>
		</div>
	</div>
</template>
