<script setup lang="ts">
import type { FieldArray } from 'formango'
import { useI18n } from 'vue-i18n'

import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppFormInput from '@/components/core/input/AppFormInput.vue'
import AppFormSelect from '@/components/core/select/AppFormSelect.vue'
import AppFormSwitch from '@/components/core/switch/AppFormSwitch.vue'
import { PERSON_TITLE_ITEMS } from '@/constants/personTitle.constant.ts'
import type { CustomerCreateContactPersonForm } from '@/models/customers/customerCreateForm.model.ts'

const props = defineProps<{
	contactPersons: FieldArray<CustomerCreateContactPersonForm[]>
	index: number
}>()

const { t } = useI18n()

const title = props.contactPersons.register(`${props.index}.title`)
const firstName = props.contactPersons.register(`${props.index}.firstName`)
const lastName = props.contactPersons.register(`${props.index}.lastName`)
const personFunction = props.contactPersons.register(`${props.index}.personFunction`)
const email = props.contactPersons.register(`${props.index}.email`)
const phoneNumber = props.contactPersons.register(`${props.index}.phoneNumber`)
const isPrimary = props.contactPersons.register(`${props.index}.isPrimary`)
</script>

<template>
	<AppFormGrid :cols="2">
		<AppFormGrid
			class="col-span-full"
			:cols="2"
		>
			<AppFormSelect
				:display-function="(item) => t(item.label)"
				:items="PERSON_TITLE_ITEMS"
				:label="t('shared.title')"
				v-bind="title"
			/>
			<div
				v-if="!isPrimary.modelValue"
				class="flex items-end justify-end"
			>
				<AppButton variant="destructive">
					{{ t('shared.delete') }}
				</AppButton>
			</div>
		</AppFormGrid>
		<AppFormInput
			:label="t('shared.first_name')"
			v-bind="firstName"
		/>
		<AppFormInput
			:label="t('shared.last_name')"
			v-bind="lastName"
		/>
		<AppFormInput
			:label="t('shared.function')"
			v-bind="personFunction"
		/>
		<AppFormInput
			:label="t('shared.email')"
			v-bind="email"
		/>
		<AppFormInput
			:label="t('shared.phone_number')"
			v-bind="phoneNumber"
		/>
		<AppFormGrid
			class="col-span-full"
			:cols="2"
		>
			<AppFormSwitch
				is-checkbox
				:label="t('shared.primary_contact_person')"
				v-bind="isPrimary"
			/>
		</AppFormGrid>
	</AppFormGrid>
</template>
