<script setup lang="ts" generic="TRouter extends true | false | undefined = false">
import { computed, watch } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { RouterLink, RouterView, useRoute } from 'vue-router'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import AppTabsGroup from '@/components/core/tabs/AppTabsGroup.vue'
import AppTabsList from '@/components/core/tabs/AppTabsList.vue'
import AppTabsPanels from '@/components/core/tabs/AppTabsPanels.vue'
import AppTabsTab from '@/components/core/tabs/AppTabsTab.vue'
import { useTabQuery } from '@/composables/core/tabs/tabsQuery.composable'
import type { Icon } from '@/icons'

export interface TabWithRoutes {
	label: string
	icon?: Icon
	to: RouteLocationRaw
}

export interface TabWithoutRoutes {
	label: string
	icon?: Icon
	to?: never
}

interface Props<THasRoutes> {
	/**
	 * If true, the tabs will use the router to determine which tab is active, to with a route is required.
	 * If false, the tabs will use query params to determine which tab is active.
	 * If undefined, the tabs will use query params if the router is not available.
	 */
	isRouter?: THasRoutes
	/**
	 * The tabs to display.
	 * If using the router, the tabs must have a `to` property.
	 * If not using the router, the tabs must not have a `to` property.
	 */
	tabs: THasRoutes extends true ? TabWithRoutes[] : TabWithoutRoutes[]
	/**
	 * The name of the tab query param, in case you use multiple tabs on the page.
	 */
	tabId?: string
}

const { isRouter = false, tabs, tabId = 'default' } = defineProps<Props<TRouter>>()

const selectedTab = defineModel<number>({
	default: 0,
})

// Need this or it errors because of bad generics
const allTabs = computed<TRouter extends true ? TabWithRoutes[] : TabWithoutRoutes[]>(() => {
	return tabs
})

const isUsingRouter = computed<boolean>(() => {
	// @ts-expect-error Generics in Vue SFCs are not supported yet
	return !!isRouter || isRouter === ''
})

function changeTab(index: number): void {
	selectedTab.value = index
}

function isActive(index: number): boolean {
	return selectedTab.value === index
}

const tabComponent = computed<typeof RouterLink | 'button'>(() => {
	return isUsingRouter.value ? RouterLink : 'button'
})

// Router logic
const route = useRoute()
watch(
	() => route?.path,
	() => {
		if (!isUsingRouter.value) {
			return
		}

		const tab = (allTabs.value as TabWithRoutes[]).find((tab) => {
			return route?.matched.find((route) => {
				return tab.to === route?.path
			})
		})

		if (tab) {
			selectedTab.value = (allTabs.value as TabWithRoutes[]).indexOf(tab)
		}
	}
)

// Tab logic in query params
if (!isUsingRouter.value) {
	useTabQuery({ selectedTab, tabId })
}
</script>

<template>
	<AppTabsGroup
		as="div"
		:selected-index="selectedTab"
		@change="changeTab"
	>
		<AppTabsList class="bg-background text-foreground">
			<AppTabsTab
				:is="tabComponent"
				v-for="(tab, index) in allTabs"
				:key="index"
				:is-active="isActive(index)"
				:to="(tab as TabWithRoutes)?.to ?? undefined"
			>
				<div class="flex w-full min-w-max items-center justify-center space-x-2 text-center">
					<span class="flex-none">{{ tab.label }}</span>
					<AppIcon
						v-if="tab.icon"
						class="flex-none"
						:icon="tab.icon"
					/>
				</div>
			</AppTabsTab>
		</AppTabsList>
		<AppTabsPanels>
			<slot v-if="!isUsingRouter" />
			<RouterView v-else />
		</AppTabsPanels>
	</AppTabsGroup>
</template>
@/composables/core/tabs/tabsQuery.composable
