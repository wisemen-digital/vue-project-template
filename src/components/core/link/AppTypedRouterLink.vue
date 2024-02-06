<script setup lang="ts" generic="T extends keyof Routes">
import type { RouteLocationNamedRaw } from 'vue-router'

import type { RouteLocationTyped } from '@/types/core/router/router.model.ts'
import type { Routes } from '@/types/core/router/routes.model.ts'

const { to } = defineProps<{
	to: RouteLocationTyped<T>
}>()
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
