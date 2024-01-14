<script setup lang="ts" generic="T extends keyof Routes">
import type { RouteLocationNamedRaw } from 'vue-router'

import type { RouteLocationTyped } from '@/plugins/router/router.plugin'
import type { Routes } from '@/plugins/router/routes'

interface Props {
	to: RouteLocationTyped<T>
}

const { to } = defineProps<Props>()
</script>

<template>
	<RouterLink
		v-slot="{ isActive, isExactActive }"
		class="rounded text-left ring-primary ring-offset-background duration-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
		:to="to as RouteLocationNamedRaw"
	>
		<slot
			:is-active="isActive"
			:is-exact-active="isExactActive"
		/>
	</RouterLink>
</template>
