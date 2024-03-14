import type { VNode } from 'vue'
import { h } from 'vue'

type IgnoredKeys =
  | '__v_isVNode'
  | 'class'
  | 'key'
  | 'onVnodeBeforeMount'
  | 'onVnodeBeforeUnmount'
  | 'onVnodeBeforeUpdate'
  | 'onVnodeMounted'
  | 'onVnodeUnmounted'
  | 'onVnodeUpdated'
  | 'ref'
  | 'ref_for'
  | 'ref_key'
  | 'style'

interface Constructor<P = any> {
  __isFragment?: never
  __isSuspense?: never
  __isTeleport?: never
  new (...args: any[]): { $props: P }
}

export function createComponent<TProps>(component: Constructor<TProps>, props: Omit<TProps, IgnoredKeys>): VNode {
  return h(component, props as any)
}
