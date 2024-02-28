<script setup lang="ts">
import AppIcon from '@/components/app/icon/AppIcon.vue'
import AppText from '@/components/app/text/AppText.vue'
import AppHeightTransition from '@/components/app/transitions/AppHeightTransition.vue'
import type { FormErrors } from '@/types/form/formErrors.type'

const props = withDefaults(
	defineProps<{
		errors?: FormErrors
		isTouched?: boolean
	}>(),
	{
		errors: null,
		isTouched: true,
	}
)
</script>

<template>
	<AppHeightTransition :duration="0.2">
		<div v-if="props.errors != null && props.isTouched">
			<div class="flex items-center gap-x-2">
				<AppIcon
					class="w-3.5 shrink-0 text-destructive"
					icon="warning"
				/>

				<AppText
					v-if="props.errors != null"
					class="text-destructive"
					variant="subtext"
				>
					{{ props.errors._errors[0] }}
				</AppText>
			</div>
		</div>
	</AppHeightTransition>
</template>
