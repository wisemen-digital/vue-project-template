import type { Component } from 'vue'

export const icons = {
	checkmark: import('./CheckmarkIcon.vue'),
	chevronDown: import('./ChevronDownIcon.vue'),
	chevronUp: import('./ChevronUpIcon.vue'),
	close: import('./CloseIcon.vue'),
	eye: import('./EyeIcon.vue'),
	eyeSlash: import('./EyeSlashIcon.vue'),
	plus: import('./PlusIcon.vue'),
	logo: import('./LogoIcon.vue'),
	search: import('./SearchIcon.vue'),
	warning: import('./WarningIcon.vue'),
	info: import('./WarningIcon.vue'), // TODO: Replace with info icon
} satisfies Record<string, Component>

export type Icon = keyof typeof icons
