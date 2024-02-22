import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

interface ModalContext {
	close: () => void
}

export const modalContext = Symbol('ModalContext') as InjectionKey<{
	close: () => void
}>

export function useModalContext(): ModalContext {
	const context = inject(modalContext, null)

	if (context === null) {
		const err = new Error('Component is missing a parent <AppModal /> component.')
		throw err
	}

	return context
}

export function useProvideModalContext(context: ModalContext): void {
	provide(modalContext, context)
}
