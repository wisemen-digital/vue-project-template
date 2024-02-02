<script setup lang="ts">
import type { Form } from 'formango'
import { useI18n } from 'vue-i18n'

import AppFormGrid from '@/components/app/grid/AppFormGrid.vue'
import AppFormInput from '@/components/core/input/AppFormInput.vue'
import AppFormSwitch from '@/components/core/switch/AppFormSwitch.vue'
import type { customerCreateContactPersonFormSchema } from '@/models/customers/customerCreateForm.model.ts'

const { form } = defineProps<{
	form: Form<typeof customerCreateContactPersonFormSchema>
}>()

const { t } = useI18n()

const title = form.register('title')
const firstName = form.register('firstName')
const lastName = form.register('lastName')
const personFunction = form.register('function')
const email = form.register('email')
const phoneNumber = form.register('phoneNumber')
const isPrimary = form.register('isPrimary')
</script>

<template>
	<AppFormGrid :cols="2">
		<AppFormGrid
			class="col-span-full"
			:cols="2"
		>
			<AppFormInput
				:label="t('shared.company_name')"
				v-bind="title"
			/>
		</AppFormGrid>
		<AppFormInput
			:label="t('shared.vat_number')"
			v-bind="firstName"
		/>
		<AppFormInput
			:label="t('shared.customer_type')"
			v-bind="lastName"
		/>
		<AppFormInput
			:label="t('shared.customer_type')"
			v-bind="personFunction"
		/>
		<AppFormInput
			:label="t('shared.customer_type')"
			v-bind="email"
		/>
		<AppFormInput
			:label="t('shared.customer_type')"
			v-bind="phoneNumber"
		/>
		<AppFormGrid
			class="col-span-full"
			:cols="2"
		>
			<AppFormInput
				:label="t('shared.customer_type')"
				v-bind="lastName"
			/>
		</AppFormGrid>
		<AppFormGrid
			class="col-span-full"
			:cols="2"
		>
			<AppFormSwitch
				is-checkbox
				:label="t('shared.customer_type')"
				v-bind="isPrimary"
			/>
		</AppFormGrid>
	</AppFormGrid>
</template>
