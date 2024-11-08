import type { Component } from 'vue'

export const icons = {
  appleLogo: import('./AppleLogoIcon.vue'),
  barChartSquare: import('./BarChartSquareIcon.vue'),
  cornerRightDown: import('./CornerRightDownIcon.vue'),
  edit: import('./EditIcon.vue'),
  googleLogo: import('./GoogleLogoIcon.vue'),
  leftBottomCorner: import('./LeftBottomCornerIcon.vue'),
  logOut: import('./LogOutIcon.vue'),
  stars: import('./StarsIcon.vue'),
  threeDots: import('./ThreeDotsIcon.vue'),
} satisfies Record<string, Component>

type CustomIcons = {
  [K in keyof typeof icons]: Component
}

declare module '@wisemen/vue-core' {
  interface Icons extends CustomIcons {}
}
