import type { Component, Ref } from 'vue'
import { computed, markRaw, reactive, ref } from 'vue'

import type {
	Attrs,
	Modal,
	UseModalOptions,
	UseModalReturnType,
	UseModalsContainerReturnType,
} from '@/ui/types/useModal.type.ts'

import { generateUuid } from '../utils'

const modals = ref<Modal[]>([])

export function useModalsContainer(): UseModalsContainerReturnType {
	return {
		modals,
	}
}

export function useModal<TComponent extends Record<string, unknown>>(
	options: UseModalOptions<TComponent>
): UseModalReturnType<TComponent> {
	const modalId = `modal-${generateUuid()}`

	function removeModalFromDom(): void {
		modals.value = modals.value.filter((modal) => modal.id !== modalId)
	}

	function closeModal(): void {
		const modal = modals.value.find((modal) => modal.id === modalId) as Modal

		modal.isOpen = false

		setTimeout(removeModalFromDom, 500)
	}

	async function createModal(attrs: Attrs<TComponent>): Promise<Ref<Modal>> {
		const c = await options.component()

		const component = computed<Component>(() =>
			h(
				c.default as Component,
				reactive<Attrs<TComponent>>({
					...attrs,
					modalId,
					onClose: closeModal,
				})
			)
		)

		return ref<Modal>({
			id: modalId,
			isOpen: false,
			component: markRaw(component) as any,
		})
	}

	async function openModal(attrs: Attrs<TComponent>): Promise<void> {
		const modal = await createModal(attrs)

		modals.value.push(modal.value)

		setTimeout(() => {
			modal.value.isOpen = true
		})
	}

	return {
		modalId,
		openModal: openModal as any,
		closeModal,
	}
}
