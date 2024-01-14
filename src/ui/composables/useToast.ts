import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'

interface Toast {
	id: string
	message: string
}

interface UseToastReturnType {
	toast: ComputedRef<Toast | null>
	showToastMessage: (message: string) => void
}

const toasts = ref<Toast[]>([])
const toast = computed<Toast | null>(() => toasts.value[0] ?? null)

let timeout: ReturnType<typeof setTimeout> | null = null

export function useToast(): UseToastReturnType {
	function setRemoveToastTimeout(): void {
		timeout = setTimeout(() => {
			toasts.value.shift()
			timeout = null

			if (toasts.value.length > 0) {
				setRemoveToastTimeout()
			}
		}, 5000)
	}

	function showToastMessage(message: string): void {
		toasts.value.push({
			id: Math.random().toString(36),
			message,
		})

		if (timeout === null) {
			setRemoveToastTimeout()
		}
	}

	return {
		toast,
		showToastMessage,
	}
}
