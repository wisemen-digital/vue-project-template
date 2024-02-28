<script setup lang="ts" generic="TInputType extends InputType">
import { computed } from 'vue'
import { useAttrs } from 'vue'

import AppInput from '@/components/app/input/AppInput.vue'
import FormGroup from '@/components/form/group/FormGroup.vue'
import FormLabel from '@/components/form/label/FormLabel.vue'
import { useIsFormInvalid } from '@/composables/form/form.composable.ts'
import type { FormErrors } from '@/types/form/formErrors.type.ts'
import type { InputType } from '@/types/input.type.ts'
import { generateUuid } from '@/utils/uuid/generateUuid.util.ts'

const props = withDefaults(
	defineProps<{
		isDisabled?: boolean
		isTouched?: boolean
		label: string
		placeholder?: string | null
		isRequired?: boolean
		errors?: FormErrors
		class?: string | null
	}>(),
	{
		placeholder: null,
		isDisabled: false,
		isTouched: false,
		isRequired: false,
		errors: undefined,
		class: null,
	}
)

const model = defineModel<string | null>({
	required: true,
})

const emits = defineEmits<{
	blur: []
}>()

const attrs = useAttrs()

const formId = computed<string>(() => `form-input-${generateUuid()}`)
const errors = computed<FormErrors | undefined>(() => props.errors)
const isTouched = computed<boolean>(() => props.isTouched ?? false)

const isFormInvalid = useIsFormInvalid(errors, isTouched)

function onBlur(): void {
	emits('blur')
}
</script>

<template>
	<FormGroup>
		<FormLabel
			v-if="label"
			:id="formId"
			:is-disabled="props.isDisabled"
			:is-invalid="isFormInvalid"
			:is-required="props.isRequired"
			:label="props.label"
		/>

		<AppInput
			:id="formId"
			v-bind="attrs"
			v-model="model"
			:class="props.class"
			:is-disabled="props.isDisabled"
			:is-invalid="isFormInvalid"
			:placeholder="props.placeholder"
			@blur="onBlur"
		>
			<template #right>
				<slot name="right" />
			</template>
		</AppInput>
	</FormGroup>
</template>
