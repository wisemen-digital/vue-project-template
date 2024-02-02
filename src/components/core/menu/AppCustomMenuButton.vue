<script setup lang="ts" generic="T extends keyof Routes">
import { MenuButton } from '@headlessui/vue'

import type { Props } from '@/components/core/button/AppButton.vue'
import type { Routes } from '@/types/core/router/routes.model.ts'

defineProps<Props<T>>()
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
			<slot :open="open" />
		</slot>
	</MenuButton>
</template>
