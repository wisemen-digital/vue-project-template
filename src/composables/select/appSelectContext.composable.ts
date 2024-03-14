import type {
  ComputedRef,
  InjectionKey,
  Ref,
} from 'vue'
import { inject, provide } from 'vue'

export interface AppSelectContext<T> {
  getDisplayValue: (value: T) => string
  isDisabled: ComputedRef<boolean>
  isFilterable: ComputedRef<boolean>
  isInvalid: ComputedRef<boolean>
  search: Ref<string>
  value: Ref<T>
}

export const appSelectContext = Symbol('AppSelectContext') as InjectionKey<AppSelectContext<any>>

export function useAppSelectContext<T>(): AppSelectContext<T> {
  const context = inject(appSelectContext, null)

  if (context === null) {
    throw new Error('AppSelectContext not provided')
  }

  return context
}

export function useProvideAppSelectContext<T>(context: AppSelectContext<T>): void {
  provide(appSelectContext, context)
}
