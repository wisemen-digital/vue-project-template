<script setup lang="ts">
import AppAvatar from '@/components/app/avatar/AppAvatar.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppMenu from '@/components/core/menu/AppMenu.vue'
import type { TabWithRoutes } from '@/components/core/tabs/AppTabs.vue'
import AppTabs from '@/components/core/tabs/AppTabs.vue'
import { useTypedRouter } from '@/composables/core/typedRouter.composable.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import type { MenuConfiguration } from '@/types/core/menu.type.ts'

const authStore = useAuthStore()
const router = useTypedRouter()

const tabs: TabWithRoutes[] = [
	{
		to: 'matching',
		label: 'Matching',
	},
	{
		to: 'vacancies',
		label: 'Vacatures',
	},
	{
		to: 'students',
		label: 'Students',
	},

	{
		to: 'customers',
		label: 'Customers',
	},
]

const menuConfiguration: MenuConfiguration = [
	{
		text: 'Logout',
		type: 'item',
		onSelect(): void {
			authStore.logout()
			router.replace({
				name: 'login',
			})
		},
	},
]
</script>

<template>
	<div class="z-100 mb-2 flex h-16 w-full items-center justify-between gap-2 border-b px-8 shadow-modal-shadow">
		<AppIcon icon="calendar" />
		<AppTabs :tabs="tabs" />

		<div class="ml-auto" />

		<AppMenu :menu-configuration="menuConfiguration">
			<AppAvatar />
		</AppMenu>
	</div>
</template>
