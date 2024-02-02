<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppFormSection from '@/components/core/form/AppFormSection.vue'
import AppFormInput from '@/components/core/input/AppFormInput.vue'
import type { customerCreateFormSchema } from '@/models/customers/customerCreateForm.model.ts'

const { form } = defineProps<{
	form: Form<typeof customerCreateFormSchema>
}>()

const { t } = useI18n()

const companyName = form.register('companyName')
const vatNumber = form.register('vatNumber')
const type = form.register('type')
</script>

<template>
	<AppFormGrid :cols="1">
		<AppFormSection :title="t('shared.information')">
			<AppFormGrid :cols="2">
				<AppFormInput
					:label="t('shared.company_name')"
					v-bind="companyName"
				/>
				<AppFormInput
					:label="t('shared.vat_number')"
					v-bind="vatNumber"
				/>
				<AppFormInput
					:label="t('shared.customer_type')"
					v-bind="type"
				/>
			</AppFormGrid>
		</AppFormSection>
	</AppFormGrid>
</template>
