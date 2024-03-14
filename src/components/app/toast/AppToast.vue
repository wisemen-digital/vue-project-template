<script setup lang="ts" generic="TPromise">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

import { toast, toastContainer } from '@/components/app/toast/appToast.style'
import type { ToastParams } from '@/composables/toast/toast.composable'

import AppButton from '../button/AppButton.vue'
import AppIcon from '../icon/AppIcon.vue'
import AppLoader from '../loader/AppLoader.vue'
import AppText from '../text/AppText.vue'

export type PromiseStatus = 'pending' | 'rejected' | 'resolved'

const { action, title, variant, icon, promise } = defineProps<ToastParams<TPromise>>()
const emits = defineEmits<{
	/**
	 * Emitted when the toast is closed.
	 */
	closeToast: []
}>()

function handleClose(): void {
	emits('closeToast')
}

// Action logic
function handleAction(): void {
	if (!action) {
		return
	}

	action.onClick()
	handleClose()
}

// Promise logic
const isPromiseToast = computed<boolean>(() => {
	return !!promise
})

const promiseStatus = ref<PromiseStatus>('pending')
const promiseData = ref<TPromise | null | undefined>(null) as Ref<TPromise | null | undefined>
const promiseError = ref<string | null>(null)

async function handleToast(): Promise<void> {
	promiseStatus.value = 'pending'

	try {
		promiseData.value = await promise?.action
		promiseStatus.value = 'resolved'
	} catch (error) {
		promiseStatus.value = 'rejected'
		promiseError.value = (error as Error).message
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
</script>

<template>
	<div
		ref="toastContainerElement"
		class="relative"
	>
		<div
			ref="toastElement"
			class="transition-all ease-linear"
			:class="[
				toastContainer({
					variant,
				}),
			]"
		>
			<div
				:class="
					toast({
						variant,
					})
				"
			>
				<div class="flex items-center gap-2">
					<!-- Icon that is showing -->
					<div v-if="!isPromiseToast">
						<AppIcon
							v-if="icon"
							class="h-4"
							:icon="icon"
						/>
					</div>
					<Transition
						v-else
						mode="out-in"
					>
						<AppLoader
							v-if="promiseStatus === 'pending'"
							class="h-4"
						/>
						<AppIcon
							v-else-if="promiseStatus === 'resolved'"
							class="h-4"
							icon="checkmark"
						/>
						<AppIcon
							v-else-if="promiseStatus === 'rejected'"
							class="h-4"
							icon="warning"
						/>
					</Transition>

					<!-- Text that is showing -->
					<div>
						<AppText variant="subtext">
							{{ title }}
						</AppText>
						<div class="text-caption">
							<template v-if="!isPromiseToast">
								<AppText
									v-if="description"
									variant="body"
								>
									{{ description }}
								</AppText>
							</template>
							<Transition
								v-else
								mode="out-in"
							>
								<AppText
									v-if="promiseStatus === 'pending'"
									variant="body"
								>
									{{ promise?.loadingMessage }}
								</AppText>
								<AppText
									v-else-if="promiseStatus === 'resolved' && promiseData"
									variant="body"
								>
									{{ promise?.successMessage(promiseData) }}
								</AppText>
								<AppText
									v-else-if="promiseStatus === 'rejected' && promiseError"
									variant="body"
								>
									{{ promise?.errorMessage(promiseError) }}
								</AppText>
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
							class="h-4"
							icon="close"
						/>
					</AppButton>
				</div>
			</div>
		</div>
	</div>
</template>
