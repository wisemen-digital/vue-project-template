<script setup lang="ts">
import { computed } from 'vue'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import type { FormStep } from '@/components/core/stepper/appFormStep.type.ts'
import AppText from '@/components/core/text/AppText.vue'

const props = defineProps<{
	activeStepId: string
	steps: FormStep[]
}>()

const activeStepId = computed<string>(() => props.activeStepId)
const steps = computed<FormStep[]>(() => props.steps)

const emits = defineEmits<{
	'step-click': [step: string]
}>()

function isStepActive(stepId: string): boolean {
	return stepId === activeStepId.value
}

function onStepClick(stepId: string): void {
	emits('step-click', stepId)
}
</script>

<template>
	<div class="flex flex-col">
		<div
			v-for="(step, index) in steps"
			:key="step.label"
		>
			<button
				class="w-[280px] rounded-button"
				:class="{ 'opacity-50': !isStepActive(step.id) }"
				@click="onStepClick(step.id)"
			>
				<span class="flex items-center gap-4">
					<span
						class="relative flex h-8 w-8 items-center justify-center rounded-button border border-solid bg-background"
						:class="[isStepActive(step.id) ? 'border-primary' : 'border-muted']"
					>
						<AppIcon
							:class="[isStepActive(step.id) ? 'text-primary' : 'text-muted']"
							:icon="step.icon"
							size="sm"
						/>
						<span
							v-if="step.isCompleted"
							class="absolute -right-1 -top-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-primary text-white"
						>
							<AppIcon
								icon="checkmark"
								size="xs"
							/>
						</span>

						<span
							v-if="step.hasError.value"
							class="absolute -right-1 -top-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-destructive text-white"
						>
							<AppIcon
								icon="close"
								size="xs"
							/>
						</span>
					</span>
					<AppText :class="{ 'font-medium text-primary': isStepActive(step.id) }">
						{{ step.label }}
					</AppText>
				</span>
			</button>
			<span
				v-if="index !== steps.length - 1"
				class="flex w-8 justify-center"
			>
				<span class="h-6 w-[1px] bg-muted" />
			</span>
		</div>
	</div>
</template>
