<script setup lang="ts">
import type { Icon } from '@/icons/icons'

import AppIcon from '../icon/AppIcon.vue'
import AppButton from './AppButton.vue'

const props = defineProps<{
	icon: Icon
}>()
</script>

<template>
	<AppButton
		size="icon"
		variant="ghost"
	>
		<AppIcon
			:icon="props.icon"
			size="sm"
		/>
	</AppButton>
</template>
