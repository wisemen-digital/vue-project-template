<script setup lang="ts">
import { computed } from 'vue'

import AppDarkModeToggle from '@/components/layout/AppDarkModeToggle.vue'
import { useTheme } from '@/composables/theme/theme.composable.ts'

const theme = useTheme()

const isDarkModeEnabled = computed<boolean>(() => theme.theme.value === 'dark')

function onDarkModeToggleClick(): void {
	if (theme.theme.value === 'dark') {
		theme.setTheme(null)
		return
	}

	theme.setTheme('dark')
}
</script>

<template>
	<div class="flex h-full min-h-screen w-full flex-col">
		<!-- TODO: sidebar, header, ... -->
		<div class="flex flex-1 overflow-hidden">
			<RouterView />
		</div>
		<AppDarkModeToggle
			class="fixed bottom-4 left-4"
			:is-dark-mode="isDarkModeEnabled"
			@click="onDarkModeToggleClick"
		/>
	</div>
</template>
