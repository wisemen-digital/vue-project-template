<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useAttrs } from 'vue'

import AppIcon from '@/components/app/icon/AppIcon.vue'
import AppText from '@/components/app/text/AppText.vue'
import type { Icon } from '@/icons/icons.ts'
import { cn } from '@/utils/style.util.ts'

const props = withDefaults(
	defineProps<{
		id: string
		isDisabled?: boolean
		isInvalid?: boolean
		placeholder?: string | null
		prefixIcon?: Icon | null
		suffixIcon?: Icon | null
		prefixText?: string | null
		suffixText?: string | null
		class?: string | null
	}>(),
	{
		isDisabled: false,
		isInvalid: false,
		placeholder: null,
		prefixIcon: null,
		suffixIcon: null,
		prefixText: null,
		suffixText: null,
		class: null,
	}
)

const emit = defineEmits<{
	blur: []
}>()

const model = defineModel<string | null>()
const attrs = useAttrs()

const prefixElementRef = ref<HTMLElement | null>(null)
const suffixElementRef = ref<HTMLElement | null>(null)

const prefixTextSize = useElementSize(prefixElementRef)
const suffixTextSize = useElementSize(suffixElementRef)

const paddingLeftWidth = computed<string>(() => {
	if (prefixElementRef.value) {
		return String(prefixTextSize.width.value + 20)
	}

	return ''
})

const paddingRightWidth = computed<string>(() => {
	if (suffixElementRef.value) {
		return String(suffixTextSize.width.value + 20)
	}

	return ''
})
</script>

<template>
	<div class="relative w-full">
		<div
			v-if="props.prefixIcon"
			ref="prefixElementRef"
			class="absolute bottom-0 left-3 top-0 flex items-center"
		>
			<AppIcon
				class="text-input-foreground"
				:icon="props.prefixIcon"
				size="sm"
			/>
		</div>
		<div
			v-if="props.prefixText"
			ref="prefixElementRef"
			class="absolute bottom-0 left-3 top-0 flex items-center border-b border-r border-t border-solid border-input-border bg-background pr-2"
		>
			<AppText variant="subtext">{{ prefixText }}</AppText>
		</div>
		<input
			:id="props.id"
			v-bind="attrs"
			v-model="model"
			:class="
				cn(
					'flex h-10 w-full rounded-md border border-input-border bg-background px-3 py-2 text-sm ring-offset-background duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					{
						'border-destructive': props.isInvalid,
					},
					props.class
				)
			"
			:disabled="props.isDisabled"
			:placeholder="props.placeholder ?? undefined"
			:style="`padding-left: ${paddingLeftWidth}px; padding-right: ${paddingRightWidth}px;`"
			@blur="() => emit('blur')"
		/>
		<slot name="right">
			<div
				v-if="props.suffixIcon"
				ref="suffixElementRef"
				class="absolute bottom-0 right-2 top-0 flex items-center"
			>
				<AppIcon
					class="text-input-foreground"
					:icon="props.suffixIcon"
					size="sm"
				/>
			</div>
		</slot>
		<div
			v-if="props.suffixText"
			ref="suffixElementRef"
			class="absolute bottom-0 right-2 top-0 flex items-center border-b border-l border-t border-solid border-input-border bg-background pl-2"
		>
			<AppText variant="subtext">{{ suffixText }}</AppText>
		</div>
	</div>
</template>
