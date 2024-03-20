import { h, markRaw } from 'vue'
import { toast } from 'vue-sonner'

import type { ToastProps } from '@/components/app/toast/appToast.style'
import AppToast from '@/components/app/toast/AppToast.vue'
import type { Icon } from '@/icons/icons'

export interface ToastPromise<TPromise> {
  /**
   * The promise that the toast is waiting for.
   * The toast will be closed when the promise is resolved or rejected.
   * The toast will show the success message when the promise is resolved.
   * The toast will show the error message when the promise is rejected.
   * The toast will show the loading message when the promise is pending.
   */
  action: Promise<TPromise>
  /**
   * The message that the toast will show when the promise is rejected.
   */
  errorMessage: (error: string) => string
  /**
   * The message that the toast will show when the promise is pending.
   */
  loadingMessage: string
  /**
   * The message that the toast will show when the promise is resolved.
   */
  successMessage: (data: TPromise) => string
}
export interface ToastParams<TPromise> {
  /**
   * The action of the toast.
   */
  action?: {
    /**
     * The label of the action.
     */
    label: string
    /**
     * The callback that will be called when the action is clicked.
     */
    onClick: () => void
  }

  /**
   * The description of the toast.
   */
  description?: string
  /**
   * The duration of the toast.
   */
  duration?: number
  /**
   * The icon shown in front of the toast.
   */
  icon?: Icon
  /**
   * The promise that the toast is waiting for.
   */
  promise?: ToastPromise<TPromise>
  /**
   * The title of the toast.
   */
  title: string

  /**
   * The variant of the toast that decides the styling.
   */
  variant?: ToastProps['variant']
}
export type ToastParamsWithoutVariant<TPromise> = Omit<ToastParams<TPromise>, 'variant'>

export function useToast(): {
  showToast: <TPromise>(toastParams: ToastParams<TPromise>) => void
  showToastApiError: (error: unknown) => void
  showToastError: <TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>) => void
  showToastInfo: <TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>) => void
  showToastSuccess: <TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>) => void
  showToastWarn: <TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>) => void
} {
  function renderToast<TPromise>({
    action,
    duration = Number.POSITIVE_INFINITY,
    icon,
    promise,
    title,
    variant,
  }: ToastParams<TPromise>): void {
    const toastComponent = h(AppToast<TPromise>, { action, icon, promise, title, variant })
    toast.custom(markRaw(toastComponent), { duration })
  }

  function showToastError<TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>): void {
    renderToast({ icon: 'warning', variant: 'error', ...toastParams })
  }

  function showToastSuccess<TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>): void {
    renderToast({ icon: 'checkmark', variant: 'success', ...toastParams })
  }

  function showToastInfo<TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>): void {
    renderToast({ icon: 'info', variant: 'info', ...toastParams })
  }

  function showToastWarn<TPromise>(toastParams: ToastParamsWithoutVariant<TPromise>): void {
    renderToast({ icon: 'warning', variant: 'warn', ...toastParams })
  }

  function showToast<TPromise>(toastParams: ToastParams<TPromise>): void {
    renderToast({ variant: 'default', ...toastParams })
  }

  function showToastApiError(error: unknown): void {
    showToastError({
      description: error instanceof Error ? error.message : 'An error occurred',
      title: 'Error',
    })
  }

  return {
    showToast,
    showToastApiError,
    showToastError,
    showToastInfo,
    showToastSuccess,
    showToastWarn,
  }
}
