import type { Component } from 'vue'

export const icons = {
  appleLogo: import('./AppleLogoIcon.vue'),
  barChartSquare: import('./BarChartSquareIcon.vue'),
  bottomLeftCorner: import('./BottomLeftCornerIcon.vue'),
  bottomRightCorner: import('./BottomRightCornerIcon.vue'),
  brush: import('./BrushIcon.vue'),
  chevronDown: import('./ChevronDownIcon.vue'),
  chevronUp: import('./ChevronUpIcon.vue'),
  copy: import('./CopyIcon.vue'),
  edit: import('./EditIcon.vue'),
  file: import('./FileIcon.vue'),
  googleLogo: import('./GoogleLogoIcon.vue'),
  infoCircle: import('./InfoCircleIcon.vue'),
  logout: import('./LogoutIcon.vue'),
  settings: import('./SettingsIcon.vue'),
  shield: import('./ShieldIcon.vue'),
  stars: import('./StarsIcon.vue'),
  threeDots: import('./ThreeDotsIcon.vue'),
  trashIcon: import('./TrashIcon.vue'),
  users: import('./UsersIcon.vue'),
  userSquare: import('./UserSquareIcon.vue'),
} satisfies Record<string, Component>

type CustomIcons = {
  [K in keyof typeof icons]: Component
}

declare module '@wisemen/vue-core-components' {
  interface Icons extends CustomIcons {}
}

declare module '@wisemen/vue-core' {
  interface Icons extends CustomIcons {}
}
