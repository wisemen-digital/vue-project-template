<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppDivider from '@/components/app/AppDivider.vue'
import AppGrid from '@/components/app/AppGrid.vue'
import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppFormSection from '@/components/core/form/AppFormSection.vue'
import type { clientCreateFormSchema } from '@/models/clients/clientCreateForm.model.ts'
import ClientsCreateContactPersonForm from '@/modules/clients/features/create/components/ClientsCreateContactPersonForm.vue'

const { form } = defineProps<{
	form: Form<typeof clientCreateFormSchema>
}>()

const { t } = useI18n()

const contactPersons = form.registerArray('contactPersons', [
	{
		title: 'mr',
		firstName: '',
		phoneNumber: '',
		email: '',
		personFunction: '',
		isPrimary: true,
		lastName: '',
	},
])

function onAddContactButtonClick(): void {
	contactPersons.append({
		title: 'mr',
		firstName: '',
		phoneNumber: '',
		email: '',
		personFunction: '',
		isPrimary: false,
		lastName: '',
	})
}
</script>

<template>
	<AppFormGrid :cols="1">
		<AppFormSection :title="t('shared.contact_person')">
			<AppGrid
				v-for="(_, index) in contactPersons.modelValue.length"
				:key="index"
				:cols="1"
			>
				<ClientsCreateContactPersonForm
					:contact-persons="contactPersons"
					:index="index"
				/>
				<AppDivider direction="horizontal" />
			</AppGrid>
			<div class="flex justify-end">
				<AppButton
					icon-left="plus"
					@click="onAddContactButtonClick"
				>
					{{ t('shared.add_contact') }}
				</AppButton>
			</div>
		</AppFormSection>
	</AppFormGrid>
</template>
