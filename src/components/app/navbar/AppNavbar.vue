<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppAvatar from '@/components/app/avatar/AppAvatar.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppMenu from '@/components/core/menu/AppMenu.vue'
import type { TabWithRoutes } from '@/components/core/tabs/AppTabs.vue'
import { useTypedRouter } from '@/composables/core/typedRouter.composable.ts'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import type { MenuConfiguration } from '@/types/core/menu.type.ts'

const { t } = useI18n()
const router = useTypedRouter()
const authStore = useAuthStore()

const tabs: TabWithRoutes[] = [
	{
		label: t('shared.matching'),
		to: 'matching-overview',
	},
	{
		label: t('shared.vacancies'),
		to: 'vacancies-overview',
	},
	{
		label: t('shared.students'),
		to: 'students-overview',
	},
	{
		label: t('shared.customers'),
		to: 'customers-overview',
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

const currentUser = computed<CurrentUser | null>(() => authStore.currentUser)

function onTabClick(tab: TabWithRoutes): void {
	router.push({ name: tab.to })
}

function isRouteActive(tab: TabWithRoutes): boolean {
	return router.currentRoute.value.name === tab.to
}
</script>

<template>
	<div class="sticky top-0 z-[100] h-14 w-full border-b border-solid border-border bg-background">
		<div class="container mx-auto flex h-14 items-center justify-between gap-2">
			<AppIcon
				icon="logo"
				size="lg"
			/>
			<div class="flex items-center gap-2">
				<AppButton
					v-for="tab in tabs"
					:key="tab.label"
					:class="{ 'bg-primary/10': isRouteActive(tab) }"
					size="sm"
					variant="ghost"
					@click="onTabClick(tab)"
				>
					{{ tab.label }}
				</AppButton>
			</div>

			<div class="ml-auto" />

			<div class="flex">
				<AppButton
					size="sm"
					variant="ghost"
				>
					<AppIcon
						icon="search"
						size="sm"
					/>
				</AppButton>
				<AppButton
					size="sm"
					variant="ghost"
				>
					<AppIcon
						icon="settings"
						size="sm"
					/>
				</AppButton>
			</div>

			<AppMenu
				is-custom-button
				:menu-configuration="menuConfiguration"
			>
				<AppAvatar :user="currentUser" />
			</AppMenu>
		</div>
	</div>
</template>
