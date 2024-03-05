<script setup lang="ts">
import { ComboboxItem, ComboboxItemIndicator } from 'radix-vue'

import AppIcon from '@/components/app/icon/AppIcon.vue'
import AppText from '@/components/app/text/AppText.vue'

const props = withDefaults(
	defineProps<{
		value: string
		isDisabled?: boolean
	}>(),
	{
		isDisabled: false,
	}
)
</script>

<template>
	<ComboboxItem
		class="cursor-default rounded-md px-2 py-1.5 outline-none hover:bg-muted-background focus:bg-muted-background data-[disabled]:cursor-not-allowed data-[disabled]:bg-background data-[highlighted]:bg-muted-background data-[disabled]:opacity-50"
		:disabled="isDisabled"
		:value="props.value"
	>
		<div class="flex items-center gap-x-3">
			<div class="w-4">
				<ComboboxItemIndicator>
					<AppIcon
						class="text-muted-foreground"
						icon="checkmark"
						size="default"
					/>
				</ComboboxItemIndicator>
			</div>

			<AppText variant="subtext">
				<slot />
			</AppText>
		</div>
	</ComboboxItem>
</template>
