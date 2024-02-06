<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppFormSection from '@/components/core/form/AppFormSection.vue'
import AppFormInput from '@/components/core/input/AppFormInput.vue'
import type { clientCreateFormSchema } from '@/models/clients/clientCreateForm.model.ts'

const { form } = defineProps<{
	form: Form<typeof clientCreateFormSchema>
}>()

const { t } = useI18n()

const billingEmail = form.register('billingInformation.email')
</script>

<template>
	<AppFormSection :title="t('shared.billing_information')">
		<AppFormGrid :cols="2">
			<AppFormInput
				:label="t('shared.billing_email')"
				v-bind="billingEmail"
			/>
		</AppFormGrid>
	</AppFormSection>
</template>
