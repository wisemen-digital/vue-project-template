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

export function useFormStepper(props: { steps: MaybeRefOrGetter<FormStep[]> }): FormStepper {
	const activeStepId = ref<string>(toValue(props.steps)[0].id)

	const steps = computed<FormStep[]>(() => toValue(props.steps))

	const isFirstStepActive = computed<boolean>(() => {
		return steps.value[0].id === activeStepId.value
	})

	const isLastStepActive = computed<boolean>(() => {
		return steps.value[steps.value.length - 1].id === activeStepId.value
	})

	function nextStep(): void {
		const activeStepIndex = steps.value.findIndex((step) => step.id === activeStepId.value)

		if (activeStepIndex < steps.value.length - 1) {
			activeStepId.value = steps.value[activeStepIndex + 1].id
		}
	}

	function previousStep(): void {
		const activeStepIndex = steps.value.findIndex((step) => step.id === activeStepId.value)

		if (activeStepIndex > 0) {
			activeStepId.value = steps.value[activeStepIndex - 1].id
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
