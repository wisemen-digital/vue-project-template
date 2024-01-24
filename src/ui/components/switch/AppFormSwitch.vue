<script setup lang="ts">
import { Switch } from '@headlessui/vue'

interface Props {
	isDisabled?: boolean
}

const { isDisabled = false } = defineProps<Props>()

const emit = defineEmits<{
	(event: 'focus', e: FocusEvent): void
	(event: 'blur', e: FocusEvent): void
}>()

const isSelected = defineModel<boolean>({
	required: true,
})

function onFocus(e: FocusEvent): void {
	emit('focus', e)
}

function onBlur(e: FocusEvent): void {
	emit('blur', e)
}
</script>

<template>
	<Switch
		v-model="isSelected"
		class="relative inline-flex h-6 w-10 items-center rounded-full ring-primary ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		:class="[
			isSelected ? 'bg-primary' : 'bg-gray-200',
			{
				'cursor-not-allowed opacity-50': isDisabled,
			},
		]"
		:disabled="isDisabled"
		@blur="onBlur"
		@focus="onFocus"
	>
		<span
			class="inline-block size-5 rounded-full bg-white shadow-sm duration-100"
			:class="isSelected ? 'translate-x-[1.15rem]' : 'translate-x-0.5'"
		/>
	</Switch>
</template>
