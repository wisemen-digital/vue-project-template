import type { Component } from 'vue'

export const icons = {
  appleLogo: import('./AppleLogoIcon.vue'),
  barChartSquare: import('./BarChartSquareIcon.vue'),
  bottomLeftCorner: import('./BottomLeftCornerIcon.vue'),
  bottomRightCorner: import('./BottomRightCornerIcon.vue'),
  edit: import('./EditIcon.vue'),
  googleLogo: import('./GoogleLogoIcon.vue'),
  logout: import('./LogoutIcon.vue'),
  stars: import('./StarsIcon.vue'),
} satisfies Record<string, Component>

type CustomIcons = {
  [K in keyof typeof icons]: Component
}

declare module '@wisemen/vue-core' {
  interface Icons extends CustomIcons {}
}
