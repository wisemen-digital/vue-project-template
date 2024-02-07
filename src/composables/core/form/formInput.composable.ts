import type { MaybeRefOrGetter, Ref } from 'vue'
import { computed, toValue } from 'vue'
import type { ZodFormattedError } from 'zod'

import type { InputType, InputValue } from '@/models/core/input.model'
import { generateUuid } from '@/utils/core/uuid/generateUuid.util'

export interface UseFormInputProps<TInputType extends InputType> {
	/**
	 * The error messages associated with the component, if any.
	 * It should be an object with an "_errors" property containing an array of strings.
	 */
	errors?: MaybeRefOrGetter<ZodFormattedError<string> | null | undefined>

	/**
	 * Determines if the component has emitted a `blur` event.
	 */
	isTouched: MaybeRefOrGetter<boolean>

	/**
	 * The value of the input.
	 */
	value: Ref<InputValue<TInputType>>

	/**
	 * Whether the input border should be red.
	 */
	isPasswordVisible?: MaybeRefOrGetter<boolean>

	/**
	 * The type of input for the component. Can be one of:
	 * 'date', 'email', 'number', 'password', 'text', 'time', 'datetime-local'
	 * Defaults to 'text'.
	 */
	type: MaybeRefOrGetter<TInputType>
}

export function useFormInput<TInputType extends InputType>({
	errors,
	isTouched,
	value,
	type,
	isPasswordVisible,
}: UseFormInputProps<TInputType>): {
	id: string
	isInvalid: Ref<boolean>
	computedValue: Ref<InputValue<TInputType>>
	computedType: Ref<InputType>
} {
	const id = `app-form-date-${generateUuid()}`
	const isInvalid = computed<boolean>(() => {
		return toValue(isTouched) && toValue(errors) != null
	})

	const computedValue = computed<InputValue<TInputType>>({
		get: () => toValue(value),
		set: (newValue: InputValue<TInputType>) => {
			if (toValue(type) === 'number') {
				value.value = (newValue === '' ? '' : Number(newValue)) as InputValue<TInputType>
			} else {
				value.value = newValue
			}
		},
	})

	const computedType = computed<InputType>(() => {
		if (toValue(type) === 'password' && toValue(isPasswordVisible)) {
			return 'text'
		}

		return toValue(type) ?? 'text'
	})
	return {
		id,
		isInvalid,
		computedValue,
		computedType,
	}
}
