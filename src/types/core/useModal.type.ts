/* eslint-disable @typescript-eslint/no-explicit-any -- generics needs any at some point */
export interface Constructor<P = any> {
	__isFragment?: never
	__isTeleport?: never
	__isSuspense?: never
	new (...args: any[]): { $props: P }
}

export interface UseModalOptions<P> {
	component: Constructor<P>
	attrs?: Omit<P, 'isOpen'> | (object extends P ? null : never)
}

export interface UseModalReturnType {
	open: () => void
	close: () => void
	moveToTop: () => void
	moveToBottom: () => void
	destroy: () => void
	onOpen: (cb: () => void) => void
	onClose: (cb: () => void) => void
}

export interface RenderedModal extends UseModalOptions<any> {
	id: string
	isOpen: boolean
}
