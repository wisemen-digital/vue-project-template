<script setup lang="ts">
import type { Props as ButtonProps } from '@/components/core/button/AppButton.vue'
import AppMenuButton from '@/components/core/menu/AppMenuButton.vue'
import AppMenuContainer from '@/components/core/menu/AppMenuContainer.vue'
import AppMenuDivider from '@/components/core/menu/AppMenuDivider.vue'
import AppMenuItem from '@/components/core/menu/AppMenuItem.vue'
import AppMenuPanel from '@/components/core/menu/AppMenuPanel.vue'
import type { MenuConfiguration, MenuOption } from '@/types/core/menu.type'

defineProps<{
	/**
	 * The menu configuration, which is an array of menu options.
	 */
	menuConfiguration: MenuConfiguration
	/**
	 * The button props, which are passed to the button component.
	 */
	buttonProps?: ButtonProps
}>()
export type MenuItemComponent = typeof AppMenuDivider | typeof AppMenuItem

function getMenuConfigurationItem(type: MenuOption): MenuItemComponent {
	switch (type) {
		case 'divider':
			return AppMenuDivider
		case 'item':
			return AppMenuItem
	}
}
</script>

<template>
	<AppMenuContainer>
		<AppMenuButton v-bind="buttonProps">
			<slot />
		</AppMenuButton>
		<AppMenuPanel>
			<slot name="panel-top" />
			<Component
				:is="getMenuConfigurationItem(menuItem.type)"
				v-for="(menuItem, index) in menuConfiguration"
				:key="index"
				v-bind="menuItem"
			/>
		</AppMenuPanel>
		<slot name="panel-bottom" />
	</AppMenuContainer>
</template>
