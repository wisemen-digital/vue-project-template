<script setup lang="ts" generic="T extends string">
import { computed } from 'vue'

import AppCombobox from '@/components/app/combobox/AppCombobox.vue'
import { useIsFormInvalid } from '@/composables/form/form.composable'
import type { DataItem } from '@/types/dataItem.type'
import type { FormErrors } from '@/types/form/formErrors.type'
import { generateUuid } from '@/utils/uuid/generateUuid.util'

import FormError from '../error/FormError.vue'
import FormGroup from '../group/FormGroup.vue'
import FormLabel from '../label/FormLabel.vue'

const props = withDefaults(
	defineProps<{
		options: DataItem<T>[]
		isTouched: boolean
		errors: FormErrors
		label: string
		isInvalid?: boolean
		placeholder?: string | null
		emptyText?: string | null
	}>(),
	{
		isInvalid: false,
		placeholder: null,
		emptyText: null,
	}
)

const model = defineModel<T | T[] | null>({
	required: true,
})

const emit = defineEmits<{
	blur: []
}>()

const id = generateUuid()

const errors = computed<FormErrors>(() => props.errors)
const isTouched = computed<boolean>(() => props.isTouched)

const isFormInvalid = useIsFormInvalid(errors, isTouched)

function onBlur(): void {
	emit('blur')
}
</script>

<template>
	<FormGroup>
		<FormLabel
			:id="id"
			:is-required="true"
			:label="props.label"
		/>

		<AppCombobox
			:id="id"
			v-model="model"
			:empty-text="props.emptyText"
			:is-invalid="isFormInvalid"
			:options="props.options"
			:placeholder="props.placeholder"
			@blur="onBlur"
		/>

		<FormError
			:errors="errors"
			:is-touched="isTouched"
		/>
	</FormGroup>
</template>
