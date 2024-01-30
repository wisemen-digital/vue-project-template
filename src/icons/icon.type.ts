import type { Component } from 'vue'

export const icons = {
	arrowDown: import('./ArrowDownIcon.vue'),
	arrowLeft: import('./ArrowLeftIcon.vue'),
	arrowRight: import('./ArrowRightIcon.vue'),
	arrowUpArrowDown: import('./ArrowUpArrowDownIcon.vue'),
	arrowUp: import('./ArrowUpIcon.vue'),
	checkmark: import('./CheckmarkIcon.vue'),
	chevronDown: import('./ChevronDownIcon.vue'),
	chevronUp: import('./ChevronUpIcon.vue'),
	close: import('./CloseIcon.vue'),
	eye: import('./EyeIcon.vue'),
	eyeSlash: import('./EyeSlashIcon.vue'),
	plus: import('./PlusIcon.vue'),
	search: import('./SearchIcon.vue'),
	warning: import('./WarningIcon.vue'),
	info: import('./WarningIcon.vue'), // TODO: Replace with info icon
} satisfies Record<string, Component>

export type Icon = keyof typeof icons
