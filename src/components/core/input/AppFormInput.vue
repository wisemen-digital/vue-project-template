<script setup lang="ts" generic="TInputType extends InputType">
import { ref, toRefs, useAttrs } from 'vue'

import AppButton from '@/components/core/button/AppButton.vue'
import AppFormGroup from '@/components/core/form/AppFormGroup.vue'
import AppFormError from '@/components/core/form-error/AppFormError.vue'
import AppFormLabel from '@/components/core/form-label/AppFormLabel.vue'
import AppInput from '@/components/core/input/AppInput.vue'
import AppTextFormDescription from '@/components/core/text/AppTextFormDescription.vue'
import { useFormInput } from '@/composables/core/form/formInput.composable'
import type { InputFormProps, InputType, InputValue } from '@/models/core/input.model'

const props = withDefaults(defineProps<InputFormProps<TInputType>>(), {
	errors: null,
	label: null,
	description: null,
	isRequired: false,
	showErrorMessage: false,
})

const value = defineModel<InputValue<TInputType>>({
	required: true,
})

const { errors, isTouched, type } = toRefs(props)

const isPasswordVisible = ref<boolean>(false)

/**
 * For some reason, props which are defined in AppInput are parsed as attributes instead of props
 * This is a workaround to get the props from AppInput.
 */
const attrs = useAttrs()

const { computedValue, id, isInvalid, computedType } = useFormInput({
	isTouched,
	errors,
	type: type.value ?? 'text',
	isPasswordVisible,
	value,
})

function onTogglePassword(): void {
	isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
	<AppFormGroup :class="attrs.class">
		<AppFormLabel
			v-if="label !== null"
			:id="id"
			:is-disabled="isDisabled ?? false"
			:is-invalid="isInvalid"
			:is-required="isRequired"
			:label="label"
		/>

		<AppInput
			:id="id"
			v-model="computedValue"
			v-bind="{
				...(props as Record<string, unknown>),
				...attrs,
				class: undefined,
			}"
			:is-invalid="isInvalid"
			:type="computedType"
		>
			<template #left>
				<slot name="left" />
			</template>

			<template #right>
				<slot name="right">
					<AppButton
						v-if="type === 'password'"
						class="scale-[85%]"
						:icon-left="isPasswordVisible ? 'eyeSlash' : 'eye'"
						size="icon"
						variant="ghost"
						@click="onTogglePassword"
					/>
				</slot>
			</template>
		</AppInput>
		<AppTextFormDescription
			v-if="description !== null"
			class="mt-1"
		>
			{{ description }}
		</AppTextFormDescription>

		<AppFormError
			v-if="showErrorMessage"
			:errors="errors"
			:is-touched="isTouched"
		/>
	</AppFormGroup>
</template>
