import type {
  CSSProperties,
  ComponentPublicInstance,
} from 'vue'

export type ComponentProps = ComponentPublicInstance['$props']

export type ModalId = number | string | symbol
export type StyleValue = (CSSProperties | string)[] | CSSProperties | string

export type IgnoredKeys =
  | '__v_isVNode'
  | 'class'
  | 'key'
  | 'onVnodeBeforeMount'
  | 'onVnodeBeforeUnmount'
  | 'onVnodeBeforeUpdate'
  | 'onVnodeMounted'
  | 'onVnodeUnmounted'
  | 'onVnodeUpdated'
  | 'ref_for'
  | 'ref_key'
  | 'ref'
  | 'style'

type PickKeys<T extends object, TValue extends null | undefined> = NonNullable<
	{ [K in keyof T]: TValue extends T[K] ? K : never }[keyof T]
>

type OptionalKeys<T extends object> = PickKeys<T, undefined>
type RequiredKeys<T extends object> = Exclude<keyof T, OptionalKeys<T>>

export interface Constructor<P = any> {
  __isFragment?: never
  __isTeleport?: never
  __isSuspense?: never
  new (...args: any[]): { $props: P }
}

export type Attrs<TComponent> = Omit<{
  [K in keyof TComponent]: TComponent[K] | Ref<TComponent[K]>
}, 'isOpen'>

export interface UseModalOptions<TComponent> {
  component: () => Promise<{ default: Constructor<TComponent> }>
}

export interface UseModalReturnType<TComponent extends Record<string, unknown>> {
  modalId: string
  openModal: Omit<Attrs<TComponent>, 'Symbol'> extends Record<string, never>
    ? // No params because there are no attributes
		  () => void
    : // Check if there are only optional attributes
    RequiredKeys<Omit<Attrs<TComponent>, 'Symbol'>> extends Record<string, never>
      ? // If there are only optional attributes, then the parameter is optional
		  (attrs?: Omit<Attrs<TComponent>, IgnoredKeys>) => void
      : // If there are required attributes, then the parameter is required
		  (attrs: Omit<Attrs<TComponent>, IgnoredKeys>) => void
  closeModal: () => void
}

export interface Modal extends UseModalOptions<any> {
  id: string
  isOpen: boolean
}

export interface UseModalsContainerReturnType {
  modals: Ref<Modal[]>
}
