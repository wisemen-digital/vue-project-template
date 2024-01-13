import type { Component } from 'vue'

export const icons = {
  checkmark: import('./CheckmarkIcon.vue'),
  chevronDown: import('./ChevronDownIcon.vue'),
  chevronUp: import('./ChevronUpIcon.vue'),
  close: import('./CloseIcon.vue'),
  eye: import('./EyeIcon.vue'),
  eyeSlash: import('./EyeSlashIcon.vue'),
  plus: import('./PlusIcon.vue'),
  search: import('./SearchIcon.vue'),
  warning: import('./WarningIcon.vue'),
} satisfies Record<string, Component>

export type Icon = keyof typeof icons
