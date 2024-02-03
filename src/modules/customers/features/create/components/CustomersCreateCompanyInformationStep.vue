<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppFormSection from '@/components/core/form/AppFormSection.vue'
import AppFormInput from '@/components/core/input/AppFormInput.vue'
import AppFormSelect from '@/components/core/select/AppFormSelect.vue'
import type { customerCreateFormSchema } from '@/models/customers/customerCreateForm.model.ts'
import type { SalesConsultant } from '@/models/customers/salesConsultant.model.ts'
import { CUSTOMER_TYPE_ITEMS } from '@/modules/customers/constants/customerType.constant.ts'

const { form } = defineProps<{
	form: Form<typeof customerCreateFormSchema>
	salesConsultants: SalesConsultant[]
}>()

const { t } = useI18n()

const companyName = form.register('companyInformation.name')
const vatNumber = form.register('companyInformation.vatNumber')
const type = form.register('companyInformation.type')

const salesConsultantUuid = form.register('companyInformation.salesConsultantUuid')
const address = form.register('companyInformation.address')
const website = form.register('companyInformation.website')
const phoneNumber = form.register('companyInformation.phoneNumber')
</script>

<template>
	<AppFormGrid :cols="1">
		<AppFormSection :title="t('shared.information')">
			<AppFormGrid :cols="2">
				<AppFormGrid
					class="col-span-full"
					:cols="2"
				>
					<AppFormInput
						:label="t('shared.company_name')"
						v-bind="companyName"
					/>
				</AppFormGrid>
				<AppFormInput
					:label="t('shared.vat_number')"
					v-bind="vatNumber"
				/>
				<AppFormSelect
					:display-function="(item) => item.label"
					:items="CUSTOMER_TYPE_ITEMS"
					:label="t('shared.customer_type')"
					v-bind="type"
				/>
			</AppFormGrid>
		</AppFormSection>
		<AppFormSection :title="t('shared.studaro')">
			<AppFormGrid :cols="2">
				<AppFormSelect
					:display-function="(item: SalesConsultant) => item.uuid"
					:items="salesConsultants"
					:label="t('shared.customer_type')"
					v-bind="salesConsultantUuid"
				/>
			</AppFormGrid>
		</AppFormSection>
		<AppFormSection :title="t('shared.contact')">
			<AppFormGrid :cols="2">
				<AppFormInput
					class="col-span-full"
					:label="t('shared.address')"
					v-bind="address"
				/>
				<AppFormInput
					:label="t('shared.website')"
					v-bind="website"
				/>
				<AppFormInput
					:label="t('shared.phone_number')"
					v-bind="phoneNumber"
				/>
			</AppFormGrid>
		</AppFormSection>
	</AppFormGrid>
</template>
