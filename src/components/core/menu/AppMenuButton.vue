<script setup lang="ts">
import { MenuButton } from '@headlessui/vue'

import type { Props } from '@/components/core/button/AppButton.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppIcon from '@/components/core/icon/AppIcon.vue'

const props = defineProps<Props>()
</script>

<template>
	<MenuButton
		v-slot="{ open }"
		as="div"
		class="max-w-max"
	>
		<slot
			name="element"
			:open="open"
		>
			<AppButton v-bind="props">
				<div class="flex items-center gap-2">
					<slot :open="open" />
					<AppIcon
						class="transition"
						:class="{
							'rotate-180': open,
						}"
						icon="chevronDown"
						size="sm"
					/>
				</div>
			</AppButton>
		</slot>
	</MenuButton>
</template>
