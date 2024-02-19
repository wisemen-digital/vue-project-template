import type { RouteRecordRaw } from 'vue-router'

import type { Icon } from '@/icons/icons'

export interface MenuItemProps {
	/**
	 * The type of the menu item, decides the rendering
	 */
	type: 'item'
	/**
	 * The icon to display on the left of the menu item
	 */
	iconLeft?: Icon
	/**
	 * If the menu item is disabled
	 */
	isDisabled?: boolean
	/**
	 * The text to display on the menu item
	 */
	text: string
	/**
	 * The description to display on the menu item
	 */
	description?: string
	/**
	 * Callback if a menu item is selected
	 */
	onSelect?: () => void
	/**
	 * The route to navigate to, renders as a router-link
	 */
	to?: RouteRecordRaw
}

export interface MenuDividerProps {
	/**
	 * The type of the menu item, decides the rendering
	 */
	type: 'divider'
}

/**
 * The type of the menu item, decides the rendering
 */
export type MenuOption = 'divider' | 'item'

/**
 * The configuration for the menu
 */
export type MenuConfiguration = (MenuDividerProps | MenuItemProps)[]
