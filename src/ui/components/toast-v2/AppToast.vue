<script setup lang="ts" generic="TPromise">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

import type { ToastParams } from '@/ui/composables/useToast'

import AppButton from '../button/AppButton.vue'
import AppIcon from '../icon/AppIcon.vue'
import AppLoader from '../loader/AppLoader.vue'
import { toast, toastContainer, toastIcon } from './appToast.style'

const { action, title, variant, icon, promise } = defineProps<ToastParams<TPromise>>()

const emits = defineEmits<{
	closeToast: []
}>()

function handleClose(): void {
	emits('closeToast')
}

function handleAction(): void {
	if (!action) {
		return
	}

	action.onClick()
	handleClose()
}

const isPromiseToast = computed<boolean>(() => {
	return promise != null
})

const promiseStatus = ref<'pending' | 'rejected' | 'resolved'>('pending')
const promiseData = ref<TPromise | null | undefined>(null) as Ref<TPromise | null | undefined>
const promiseError = ref<string | null>(null)

async function handleToast(): Promise<void> {
	promiseStatus.value = 'pending'

	try {
		promiseData.value = await promise?.action
		promiseStatus.value = 'resolved'
	} catch (e: Error) {
		promiseStatus.value = 'rejected'
		promiseError.value = e.message
	} finally {
		setTimeout(() => {
			handleClose()
		}, 2000)
	}
}

if (isPromiseToast.value) {
	handleToast()
}

const toastElement = ref<HTMLElement | null>(null)
const toastContainerElement = ref<HTMLElement | null>(null)

const toastContainerClasses = computed<string>(() =>
	toastContainer({
		variant,
	})
)
const toastClasses = computed<string>(() =>
	toast({
		variant,
	})
)

const toastIconClasses = computed<string>(() =>
	toastIcon({
		variant,
	})
)
</script>

<template>
	<div
		ref="toastContainerElement"
		class="relative"
	>
		<div
			ref="toastElement"
			class="transition-all ease-linear"
			:class="toastContainerClasses"
		>
			<div :class="toastClasses">
				<div class="flex items-center gap-2">
					<AppIcon
						v-if="icon && !isPromiseToast"
						:class="toastIconClasses"
						:icon="icon"
					/>

					<Transition
						v-else-if="isPromiseToast"
						enter-active-class="duration-200"
						leave-active-class="duration-200"
						leave-from-class="opacity-100"
						leave-to-class="opacity-0"
					>
						<AppLoader
							v-if="promiseStatus === 'pending'"
							:class="toastIconClasses"
						/>

						<AppIcon
							v-else-if="promiseStatus === 'resolved'"
							:class="toastIconClasses"
							icon="checkmark"
						/>

						<AppIcon
							v-else-if="promiseStatus === 'rejected'"
							:class="toastIconClasses"
							icon="warning"
						/>
					</Transition>

					<div>
						<p class="text-subtext">
							{{ title }}
						</p>

						<div class="text-caption">
							<p v-if="desciption && !isPromiseToast">
								{{ desciption }}
							</p>

							<Transition
								v-else
								enter-active-class="duration-200"
								leave-active-class="duration-200"
								leave-from-class="opacity-100"
								leave-to-class="opacity-0"
								mode="out-in"
							>
								<p v-if="promise != null && promiseStatus === 'pending'">
									{{ promise.loadingMessage }}
								</p>
								<p v-else-if="promise != null && promiseStatus === 'resolved' && promiseData">
									{{ promise.successMessage(promiseData) }}
								</p>
								<p v-else-if="promise != null && promiseStatus === 'rejected' && promiseError">
									{{ promise.errorMessage(promiseError) }}
								</p>
							</Transition>
						</div>
					</div>
				</div>
				<div class="flex items-center gap-1">
					<AppButton
						v-if="action"
						size="sm"
						variant="ghost"
						@click="handleAction"
					>
						{{ action.label }}
					</AppButton>

					<AppButton
						size="icon"
						variant="ghost"
						@click="handleClose"
						@touchstart="handleClose"
					>
						<AppIcon
							:class="toastIconClasses"
							icon="close"
						/>
					</AppButton>
				</div>
			</div>
		</div>
	</div>
</template>
