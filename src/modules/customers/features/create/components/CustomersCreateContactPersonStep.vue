<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppFormSection from '@/components/core/form/AppFormSection.vue'
import type { customerCreateFormSchema } from '@/models/customers/customerCreateForm.model.ts'
import CustomersCreateContactPersonForm from '@/modules/customers/features/create/components/CustomersCreateContactPersonForm.vue'

const { form } = defineProps<{
	form: Form<typeof customerCreateFormSchema>
}>()

const { t } = useI18n()

const contactPersons = form.registerArray('contactPersons')
</script>

<template>
	<AppFormGrid :cols="1">
		<AppFormSection :title="t('shared.information')">
			<CustomersCreateContactPersonForm
				v-for="(contactPerson, index) in contactPersons"
				:key="index"
				:form="contactPerson"
			/>
		</AppFormSection>
	</AppFormGrid>
</template>
