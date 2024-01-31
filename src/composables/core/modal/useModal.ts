import type { Ref } from 'vue'
import { onUnmounted, ref, watch } from 'vue'

import type { RenderedModal, UseModalOptions, UseModalReturnType } from '@/types/core/useModal.type'
import { generateUuid } from '@/utils/core/uuid/generateUuid'

const renderedModals = ref<RenderedModal[]>([])

export function useModalContainer(): {
	modals: Ref<RenderedModal[]>
} {
	return { modals: renderedModals }
}

export function useModal<P>({ component, attrs }: UseModalOptions<P>): UseModalReturnType {
	const id = generateUuid()
	let onOpenCb: (() => void) | null = null
	let onCloseCb: (() => void) | null = null

	function onOpen(cb: () => void): void {
		onOpenCb = cb
	}

	function onClose(cb: () => void): void {
		onCloseCb = cb
	}

	const modal = ref<RenderedModal>({
		id,
		component,
		attrs,
		isOpen: false,
	})

	renderedModals.value.push(modal.value)

	function open(): void {
		modal.value.isOpen = true
		onOpenCb?.()
	}

	function close(): void {
		modal.value.isOpen = false
		onCloseCb?.()
	}

	function moveToTop(): void {
		renderedModals.value = renderedModals.value.filter((modal) => modal.id !== id).concat(modal.value)
	}

	function moveToBottom(): void {
		renderedModals.value = [modal.value].concat(renderedModals.value.filter((modal) => modal.id !== id))
	}

	function destroy(): void {
		renderedModals.value = renderedModals.value.filter((modal) => modal.id !== id)
	}

	watch(
		() => modal.value.isOpen,
		(isOpen) => {
			if (isOpen) {
				onOpenCb?.()
			} else {
				onCloseCb?.()
			}
		}
	)

	onUnmounted(() => {
		destroy()
	})

	return {
		open,
		close,
		destroy,
		moveToTop,
		moveToBottom,
		onOpen,
		onClose,
	}
}
