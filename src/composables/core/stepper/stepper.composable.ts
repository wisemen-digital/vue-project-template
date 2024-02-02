import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, ref, toValue } from 'vue'

import type { FormStep } from '@/components/core/stepper/appFormStep.type.ts'

interface FormStepper {
	activeStepId: ComputedRef<string>
	nextStep: () => void
	previousStep: () => void
	isFirstStepActive: ComputedRef<boolean>
	isLastStepActive: ComputedRef<boolean>
	isStepActive: (stepId: string) => boolean
	onStepClick: (stepId: string) => void
}

export function useFormStepper(steps: MaybeRefOrGetter<FormStep[]>): FormStepper {
	const activeStepId = ref<string>(toValue(steps)[0].id)

	const isFirstStepActive = computed<boolean>(() => {
		const stepsValue = toValue(steps)
		return stepsValue[0].id === activeStepId.value
	})

	const isLastStepActive = computed<boolean>(() => {
		const stepsValue = toValue(steps)
		return stepsValue[stepsValue.length - 1].id === activeStepId.value
	})

	function nextStep(): void {
		const stepsValue = toValue(steps)
		const activeStepIndex = stepsValue.findIndex((step) => step.id === activeStepId.value)

		if (activeStepIndex < stepsValue.length - 1) {
			activeStepId.value = stepsValue[activeStepIndex + 1].id
		}
	}

	function previousStep(): void {
		const stepsValue = toValue(steps)
		const activeStepIndex = stepsValue.findIndex((step) => step.id === activeStepId.value)

		if (activeStepIndex > 0) {
			activeStepId.value = stepsValue[activeStepIndex - 1].id
		}
	}

	function isStepActive(stepId: string): boolean {
		return activeStepId.value === stepId
	}

	function onStepClick(stepId: string): void {
		activeStepId.value = stepId
	}

	return {
		isStepActive,
		onStepClick,
		activeStepId: computed<string>(() => activeStepId.value),
		nextStep,
		previousStep,
		isFirstStepActive,
		isLastStepActive,
	}
}
