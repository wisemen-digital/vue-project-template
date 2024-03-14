<script setup lang="ts">
import { computed, ref } from 'vue'

import AppFocusable from '@/components/app/focusable/AppFocusable.vue'
import AppIcon from '@/components/app/icon/AppIcon.vue'
import type { Icon } from '@/icons/icons'

import FormInput from './FormInput.vue'

const props = defineProps<{
	label: string
	modelValue: string | null
}>()

const emit = defineEmits<{
	'update:modelValue': [value: string]
}>()

const value = computed<string | null>({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value ?? '')
	},
})

const isPasswordVisible = ref<boolean>(false)

const inputType = computed<'password' | 'text'>(() => {
	return isPasswordVisible.value ? 'text' : 'password'
})

const passwordIcon = computed<Icon>(() => {
	return isPasswordVisible.value ? 'eyeSlash' : 'eye'
})

function handleTogglePassword(): void {
	isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
	<FormInput
		v-model="value"
		class="pr-10"
		:label="props.label"
		:type="inputType"
	>
		<template #right>
			<div class="absolute right-1.5 top-0 mr-0 flex h-full items-center">
				<AppFocusable @click="handleTogglePassword">
					<AppIcon
						class="box-content p-2"
						:icon="passwordIcon"
						size="sm"
					/>
				</AppFocusable>
			</div>
		</template>
	</FormInput>
</template>
