<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppFormSection from '@/components/core/form/AppFormSection.vue'
import AppFormInput from '@/components/core/input/AppFormInput.vue'
import AppFormSelect from '@/components/core/select/AppFormSelect.vue'
import type { ClientType } from '@/models/clients/client.model.ts'
import type { clientCreateFormSchema } from '@/models/clients/clientCreateForm.model.ts'
import type { SalesConsultant } from '@/models/clients/salesConsultant.model.ts'
import type { DataItem } from '@/models/core/dataItem.model'
import { CLIENT_TYPE_ITEMS } from '@/modules/clients/constants/clientType.constant.ts'

const { form } = defineProps<{
	form: Form<typeof clientCreateFormSchema>
	salesConsultants: SalesConsultant[]
}>()

const { t } = useI18n()

const companyName = form.register('companyInformation.name')
const vatNumber = form.register('companyInformation.vatNumber')
const type = form.register('companyInformation.type')

const salesConsultant = form.register('companyInformation.salesConsultant')
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
					:display-function="(item: DataItem<ClientType>) => item.label"
					:items="CLIENT_TYPE_ITEMS"
					key-value="value"
					:label="t('shared.client_type')"
					:placeholder="t('shared.select')"
					v-bind="type"
				/>
			</AppFormGrid>
		</AppFormSection>
		<AppFormSection :title="t('shared.studaro')">
			<AppFormGrid :cols="2">
				<AppFormSelect
					:display-function="(item: SalesConsultant) => item.fullName"
					:items="salesConsultants"
					:label="t('shared.client_type')"
					:placeholder="t('shared.select')"
					v-bind="salesConsultant"
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
