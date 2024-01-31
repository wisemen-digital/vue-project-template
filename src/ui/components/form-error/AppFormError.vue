<script setup lang="ts">
import type { z } from 'zod'

import AppText from '@/components/core/AppText.vue'

import AppIcon from '../icon/AppIcon.vue'
import AppHeightTransition from '../transitions/AppHeightTransition.vue'

const { errors, isTouched = true } = defineProps<{
	errors?: z.ZodFormattedError<string> | null | undefined
	isTouched?: boolean
}>()
</script>

<template>
	<AppHeightTransition :duration="200">
		<div v-if="errors != null && isTouched">
			<div class="mt-1 flex items-center gap-x-2">
				<AppIcon
					class="w-3.5 shrink-0 fill-white text-destructive"
					icon="warning"
				/>

				<AppText
					v-if="errors"
					class="text-destructive"
					variant="subtext"
				>
					{{ errors._errors[0] }}
				</AppText>
			</div>
		</div>
	</AppHeightTransition>
</template>
