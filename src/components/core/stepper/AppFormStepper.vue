<script setup lang="ts">
import AppIcon from '@/components/core/icon/AppIcon.vue'
import type { FormStep } from '@/components/core/stepper/appFormStep.type.ts'
import AppText from '@/components/core/text/AppText.vue'

type Props = {
	activeStepId: string
	steps: FormStep[]
}

const { steps, activeStepId } = defineProps<Props>()

const emits = defineEmits<{
	'step-click': [step: string]
}>()

function isStepActive(stepId: string): boolean {
	return stepId === activeStepId
}

function onStepClick(stepId: string): void {
	emits('step-click', stepId)
}
</script>

<template>
	<div class="flex flex-col">
		<button
			v-for="(step, index) in steps"
			:key="step.label"
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
						v-if="step.hasError"
						class="absolute -right-1 -top-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-destructive text-white"
					>
						<AppIcon
							icon="close"
							size="xs"
						/>
					</span>
				</span>
				<AppText :class="{ 'text-primary': isStepActive(step.id) }">
					{{ step.label }}
				</AppText>
			</span>
			<span
				v-if="index !== steps.length - 1"
				class="flex w-8 justify-center"
			>
				<span class="h-6 w-[1px] bg-muted" />
			</span>
		</button>
	</div>
</template>
