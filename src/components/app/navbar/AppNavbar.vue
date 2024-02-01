<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppAvatar from '@/components/app/avatar/AppAvatar.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppMenu from '@/components/core/menu/AppMenu.vue'
import type { TabWithoutRoutes } from '@/components/core/tabs/AppTabs.vue'
import AppTabs from '@/components/core/tabs/AppTabs.vue'
import { useTypedRouter } from '@/composables/core/typedRouter.composable.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import type { MenuConfiguration } from '@/types/core/menu.type.ts'

const authStore = useAuthStore()
const router = useTypedRouter()

const { t } = useI18n()

const tabs: TabWithoutRoutes[] = [
	{
		label: 'Matching',
	},
	{
		label: 'Vacatures',
	},
	{
		label: 'Students',
	},
	{
		label: t('label.customers'),
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
	<div
		class="sticky top-0 z-[100] mb-2 flex h-14 w-full items-center justify-between gap-2 border-b bg-background px-8 shadow-modal-shadow"
	>
		<AppIcon
			icon="logo"
			size="lg"
		/>
		<AppTabs :tabs="tabs" />

		<div class="ml-auto" />

		<AppMenu :menu-configuration="menuConfiguration">
			<AppAvatar />
		</AppMenu>
	</div>
</template>
