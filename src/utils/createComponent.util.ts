/* eslint-disable @typescript-eslint/no-explicit-any */

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
	| 'ref_for'
	| 'ref_key'
	| 'ref'
	| 'style'
import { h, type VNode } from 'vue'

interface Constructor<P = any> {
	__isFragment?: never
	__isTeleport?: never
	__isSuspense?: never
	new (...args: any[]): { $props: P }
}

export function createComponent<TProps>(component: Constructor<TProps>, props: Omit<TProps, IgnoredKeys>): VNode {
	return h(component, props as any)
}
