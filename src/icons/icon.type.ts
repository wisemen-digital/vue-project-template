import type { Component } from 'vue'

export enum Icon {
	CHECK_MARK = 'check-mark-icon',
	CHEVRON_DOWN = 'chevron-down-icon',
	CHEVRON_UP = 'chevron-up-icon',
	CLOSE = 'close-icon',
	EYE = 'eye-icon',
	EYE_SLASH = 'eye-slash-icon',
	PLUS = 'plus-icon',
	SEARCH = 'search-icon',
	WARNING = 'warning-icon',
}

const iconsMap = new Map<Icon, Promise<Component>>([
	[Icon.CHECK_MARK, import('@/icons/CheckmarkIcon.vue')],
	[Icon.CHEVRON_DOWN, import('@/icons/ChevronDownIcon.vue')],
	[Icon.CHEVRON_UP, import('@/icons/ChevronUpIcon.vue')],
	[Icon.CLOSE, import('@/icons/CloseIcon.vue')],
	[Icon.EYE, import('@/icons/EyeIcon.vue')],
	[Icon.EYE_SLASH, import('@/icons/EyeSlashIcon.vue')],
	[Icon.PLUS, import('@/icons/PlusIcon.vue')],
	[Icon.SEARCH, import('@/icons/SearchIcon.vue')],
	[Icon.WARNING, import('@/icons/WarningIcon.vue')],
])

export async function getIcon(icon: Icon): Promise<Component | null> {
	const iconComponent = await iconsMap.get(icon)

	return iconComponent ?? null
}
