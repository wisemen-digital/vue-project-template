<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, ref, Transition, watch } from 'vue'

import AppModalOverlay from '@/ui/components/modal/AppModalOverlay.vue'
import AppModalWrapper from '@/ui/components/modal/AppModalWrapper.vue'

interface Props {
	modalId?: string | null
	modalClasses?: string
}

const { modalId = null, modalClasses = 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' } = defineProps<Props>()

const emit = defineEmits<{ (event: 'close'): void }>()

const isModalShown = defineModel<boolean>('isOpen', {
	required: false,
})

if (isModalShown.value == null) {
	throw new Error('You must provide a `v-model:is-shown` to the `AppModal` component.')
}

const isModalActuallyShown = ref<boolean>(false)
const modal = ref<HTMLElement | null>(null)

const animateWithViewTransitionsApi = computed<boolean>(() => {
	const activatorElement = document.querySelector(`#${modalId}`) ?? null

	// @ts-expect-error - TS doesn't know about startViewTransition
	return modalId != null && document.startViewTransition != null && activatorElement !== null
})

function animateIn(): void {
	const button = document.querySelector(`#${modalId}`) as HTMLElement

	// @ts-expect-error - TS doesn't know about viewTransitionName
	button.style.viewTransitionName = 'modal'

	// @ts-expect-error - TS doesn't know about startViewTransition
	const transition = document.startViewTransition(async () => {
		isModalActuallyShown.value = true

		await nextTick()

		// @ts-expect-error - TS doesn't know about viewTransitionName
		button.style.viewTransitionName = null
		button.style.opacity = '0'

		// @ts-expect-error - TS doesn't know about viewTransitionName
		modal.value!.style.viewTransitionName = 'modal'
	})

	transition.finished.finally(() => {
		// @ts-expect-error - TS doesn't know about viewTransitionName
		modal.value!.style.viewTransitionName = null
	})
}

function animateOut(): void {
	const button = document.querySelector(`#${modalId}`) as HTMLElement

	// @ts-expect-error - TS doesn't know about viewTransitionName
	modal.value!.style.viewTransitionName = 'modal-leave'

	// @ts-expect-error - TS doesn't know about startViewTransition
	const transition = document.startViewTransition(() => {
		// @ts-expect-error - TS doesn't know about viewTransitionName
		modal.value!.style.viewTransitionName = null

		// @ts-expect-error - TS doesn't know about viewTransitionName
		button.style.viewTransitionName = 'modal-leave'
		button.style.opacity = '1'

		isModalActuallyShown.value = false
	})

	transition.finished.finally(() => {
		// @ts-expect-error - TS doesn't know about viewTransitionName
		button.style.viewTransitionName = null
	})
}

function showModal(): void {
	if (animateWithViewTransitionsApi.value) {
		animateIn()
	} else {
		isModalActuallyShown.value = true
	}
}

function hideModal(): void {
	if (animateWithViewTransitionsApi.value) {
		animateOut()
	} else {
		isModalActuallyShown.value = false
	}

	emit('close')
}

function onOverlayClick(): void {
	emit('close')
	isModalShown.value = false
}

watch(isModalShown, (isModalShown: boolean | undefined) => {
	if (isModalShown) {
		showModal()
	} else {
		hideModal()
	}
})

watch(
	isModalActuallyShown,
	(isShown: boolean) => {
		document.body.style.overflow = isShown ? 'hidden' : 'auto'
	},
	{ immediate: true }
)

useEventListener(document, 'keydown', (event) => {
	if (event.key === 'Escape' && isModalActuallyShown.value) {
		event.preventDefault()
		isModalShown.value = false
		emit('close')
	}
})

onBeforeUnmount(() => (document.body.style.overflow = 'auto'))
</script>

<template>
	<AppModalWrapper :disable-focus-trap="true">
		<Component
			:is="animateWithViewTransitionsApi ? 'div' : Transition"
			enter-active-class="duration-300 ease-modal"
			enter-from-class="opacity-0 scale-110"
			leave-active-class="duration-300 ease-modal"
			leave-to-class="opacity-0 scale-110"
		>
			<div
				v-if="isModalActuallyShown"
				ref="modal"
				class="fixed z-30 flex flex-col justify-between overflow-hidden rounded-modal border-border bg-background shadow-modal-shadow"
				:class="modalClasses"
			>
				<slot />
			</div>
		</Component>

		<Transition
			enter-active-class="duration-300 ease-modal-overlay"
			enter-from-class="opacity-0"
			leave-active-class="duration-300 ease-modal-overlay"
			leave-to-class="opacity-0"
		>
			<AppModalOverlay
				v-if="isModalActuallyShown"
				class="z-10"
				@click="onOverlayClick"
			/>
		</Transition>
	</AppModalWrapper>
</template>

<style>
::view-transition-old(modal) {
	animation-duration: 100ms;
}

::view-transition-new(modal) {
	animation-duration: 150ms;
}

::view-transition-group(modal) {
	animation-duration: 250ms;
	animation-timing-function: cubic-bezier(0.49, 0.5, 0, 1.07);
}

::view-transition-old(modal-leave) {
	animation-duration: 250ms;
	animation-timing-function: ease;
}

::view-transition-new(modal-leave) {
	animation-duration: 250ms;
}

::view-transition-group(modal-leave) {
	animation-duration: 250ms;
	animation-timing-function: ease;
}
</style>
