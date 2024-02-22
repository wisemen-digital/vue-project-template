<script setup lang="ts">
import type { Icon } from '@/icons/icons'

import AppIcon from '../icon/AppIcon.vue'
import AppButton from './AppButton.vue'

const { icon } = defineProps<{
	icon: Icon
}>()
</script>

<template>
	<AppButton
		size="icon"
		variant="ghost"
	>
		<AppIcon
			:icon="icon"
			size="sm"
		/>
	</AppButton>
</template>
