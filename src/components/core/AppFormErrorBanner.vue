<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'
import type { z } from 'zod'

const { form } = defineProps<{
	form: Form<TFormType>
}>()

const { t } = useI18n()
</script>

<template>
	<AppHeightTransition :duration="200">
		<div v-if="form.hasAttemptedToSubmit && form.errors != null && form.errors._errors != null">
			<div
				class="mb-4 flex items-center rounded-input border border-solid border-destructive bg-destructive/5 px-4 py-3"
			>
				<AppIcon
					class="size-5 flex-shrink-0 text-destructive"
					icon="warning"
				/>

				<AppText
					class="ml-4 max-w-sm text-destructive"
					variant="subtext"
				>
					{{ t('error.validation_error') }}
				</AppText>
			</div>
		</div>
	</AppHeightTransition>
</template>
