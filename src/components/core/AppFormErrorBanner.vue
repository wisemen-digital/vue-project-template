<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: Form<any>
}

const { form } = defineProps<Props>()

const { t } = useI18n()
</script>

<template>
	<AppHeightTransition :duration="200">
		<div v-if="form.hasAttemptedToSubmit && form.errors != null && form.errors._errors != null">
			<div
				class="mb-4 flex items-center rounded-input border border-solid border-destructive bg-destructive/5 px-4 py-3"
			>
				<AppIcon
					class="h-5 w-5 flex-shrink-0 text-destructive"
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
