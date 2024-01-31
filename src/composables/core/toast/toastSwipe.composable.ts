import { useSwipe } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export interface ToastSwipeOptions {
	/**
	 * The toast element.
	 */
	toastElement: Ref<HTMLElement | null>
	/**
	 * The toast container element.
	 */
	toastContainerElement: Ref<HTMLElement | null>
	/**
	 * The callback that will be called when the toast is closed.
	 */
	onClose: () => void
}

export function toastSwipeComposable({ toastElement, toastContainerElement, onClose }: ToastSwipeOptions): {
	left: Ref<string>
	bottom: Ref<string>
	opacity: Ref<number>
} {
	const toastContainerWidth = computed<number | undefined>(() => toastContainerElement.value?.offsetWidth)
	const toastContainerHeight = computed<number | undefined>(() => toastElement.value?.offsetHeight)

	const left = ref<string>('0')
	const bottom = ref<string>('0')
	const opacity = ref<number>(1)
	const lockedDirection = ref<'down' | 'right' | null>(null)

	const { direction, lengthX, lengthY } = useSwipe(toastElement, {
		passive: false,
		threshold: 0,
		onSwipe() {
			if (direction.value === 'right' && (!lockedDirection.value || lockedDirection.value === 'right')) {
				if (!toastContainerWidth.value) {
					return
				}

				lockedDirection.value = 'right'

				if (lengthX.value < 0) {
					const length = Math.abs(lengthX.value)
					left.value = `${length}px`
					opacity.value = 1.1 - length / toastContainerWidth.value
				} else {
					left.value = '0'
					opacity.value = 1
				}
			}

			if (direction.value === 'down' && (!lockedDirection.value || lockedDirection.value === 'down')) {
				if (!toastContainerHeight.value) {
					return
				}

				lockedDirection.value = 'down'

				if (lengthY.value < 0) {
					const length = Math.abs(lengthY.value)
					bottom.value = `${length}px`
					opacity.value = 1.1 - length / toastContainerHeight.value
				} else {
					bottom.value = '0'
					opacity.value = 1
				}
			}
		},
		onSwipeEnd() {
			if (lockedDirection.value === 'down') {
				if (
					lengthY.value < 0 &&
					toastContainerHeight.value &&
					Math.abs(lengthY.value) / toastContainerHeight.value >= 0.2
				) {
					bottom.value = '100%'
					opacity.value = 0
					setTimeout(() => {
						onClose()
					}, 200)
				} else {
					bottom.value = '0px'
					opacity.value = 1
				}
			}

			if (lockedDirection.value === 'right') {
				if (
					lengthX.value < 0 &&
					toastContainerWidth.value &&
					Math.abs(lengthX.value) / toastContainerWidth.value >= 0.3
				) {
					left.value = '100%'
					opacity.value = 0
					setTimeout(() => {
						onClose()
					}, 200)
				} else {
					left.value = '0px'
					opacity.value = 1
				}
			}

			lockedDirection.value = null
		},
	})

	return {
		left,
		bottom,
		opacity,
	}
}
