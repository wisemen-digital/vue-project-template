import type { Component } from 'vue'

export const icons = {
  appleLogo: import('./AppleLogoIcon.vue'),
  barChartSquare: import('./BarChartSquareIcon.vue'),
  bottomLeftCorner: import('./BottomLeftCornerIcon.vue'),
  bottomRightCorner: import('./BottomRightCornerIcon.vue'),
  brush: import('./BrushIcon.vue'),
  edit: import('./EditIcon.vue'),
  file: import('./FileIcon.vue'),
  googleLogo: import('./GoogleLogoIcon.vue'),
  logout: import('./LogoutIcon.vue'),
  shield: import('./ShieldIcon.vue'),
  stars: import('./StarsIcon.vue'),
  threeDots: import('./ThreeDotsIcon.vue'),
  trashIcon: import('./TrashIcon.vue'),
} satisfies Record<string, Component>

type CustomIcons = {
  [K in keyof typeof icons]: Component
}

declare module '@wisemen/vue-core' {
  interface Icons extends CustomIcons {}
}
