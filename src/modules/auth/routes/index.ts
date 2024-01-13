import { guest } from '@/middlewares'
import type { RouteRecordTyped } from '@/plugins'

export const routes: RouteRecordTyped[] = [{
  path: '',
  meta: {
    middleware: [guest],
  },
  component: () => import('../components/AuthLayout.vue'),
  children: [{
    path: 'login',
    name: 'login-form',
    component: async () => import('../features/login/views/LoginFormView.vue'),
  }, {
    path: 'forgot-password',
    name: 'forgot-password-form',
    component: async () => import('../features/forgot-password/views/ForgotPasswordFormView.vue'),
  }, {
    path: 'reset-password/:token',
    name: 'reset-password-form',
    component: async () => import('../features/reset-password/views/ResetPasswordFormView.vue'),
  }],
}]
