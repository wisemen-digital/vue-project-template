<script setup lang="ts">
import { useForm } from 'formango'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppFormPage from '@/components/app/form-page/AppFormPage.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppForm from '@/components/core/form/AppForm.vue'
import type { FormStep } from '@/components/core/stepper/appFormStep.type.ts'
import AppFormStepper from '@/components/core/stepper/AppFormStepper.vue'
import { useFormStepper } from '@/composables/core/stepper/stepper.composable.ts'
import { useToast } from '@/composables/core/toast/toast.composable.ts'
import type { CustomerCreateForm } from '@/models/customers/customerCreateForm.model.ts'
import { customerCreateFormSchema } from '@/models/customers/customerCreateForm.model.ts'
import type { SalesConsultant } from '@/models/customers/salesConsultant.model.ts'
import { useCustomerCreateMutation } from '@/modules/clients/api/mutations/customerCreate.mutation.ts'
import CustomersCreateCompanyInformationStep from '@/modules/clients/features/create/components/CustomersCreateCompanyInformationStep.vue'
import CustomersCreateContactPersonStep from '@/modules/clients/features/create/components/CustomersCreateContactPersonStep.vue'
import CustomersCreateInvoiceInformationStep from '@/modules/clients/features/create/components/CustomersCreateInvoiceInformationStep.vue'
import { logInfo } from '@/utils/logger.util.ts'

const { t } = useI18n()
const toast = useToast()
const customerCreateMutation = useCustomerCreateMutation()

const { onSubmitForm, form } = useForm({ schema: customerCreateFormSchema })

const steps = computed<FormStep[]>(() => [
	{
		id: 'company-information',
		label: t('shared.company_information'),
		icon: 'building',
		hasError: computed<boolean>(() => Number(form.errors.companyInformation?._errors) > 0),
		isCompleted: false,
	},
	{
		id: 'contact-person',
		label: t('shared.contact_person'),
		icon: 'mail',
		hasError: computed<boolean>(() => Number(form.errors.contactPersons?._errors) > 0),
		isCompleted: false,
	},
	{
		id: 'invoice-information',
		label: t('shared.invoice_information'),
		icon: 'creditCard',
		hasError: computed<boolean>(() => Number(form.errors.invoiceInformation?._errors) > 0),
		isCompleted: false,
	},
])

const { nextStep, previousStep, onStepClick, isStepActive, activeStepId, isLastStepActive, isFirstStepActive } =
	useFormStepper({ steps: steps })

const salesConsultants = ref<SalesConsultant[]>([])

// const formState = computed(() => form.state)
// const { setSnapshot } = useUnsavedChanges(formState)

function onSubmitButtonClick(): void {
	form.submit()
}

onSubmitForm(async (form: CustomerCreateForm) => {
	logInfo('Form submitted', form)

	try {
		await customerCreateMutation.execute({ body: form })
	} catch (error) {
		toast.showToastApiError(error)
	}
})

onMounted(() => {
	// setSnapshot(form.state)
})
</script>

<template>
	<AppFormPage
		:navigation-label="t('customers.back_to_overview')"
		:subtitle="t('customers.create_subtitle')"
		:title="t('customers.new')"
	>
		<template #stepper>
			<AppFormStepper
				:active-step-id="activeStepId"
				:steps="steps"
				@step-click="onStepClick"
			/>
		</template>

		<template #actions>
			<AppButton
				v-if="isFirstStepActive"
				:to="{ name: 'customers-overview' }"
				variant="outline"
			>
				{{ t('shared.cancel') }}
			</AppButton>
			<AppButton
				v-if="!isFirstStepActive"
				variant="outline"
				@click="previousStep"
			>
				{{ t('shared.previous') }}
			</AppButton>
			<AppButton
				v-if="!isLastStepActive"
				@click="nextStep"
			>
				{{ t('shared.next') }}
			</AppButton>
			<AppButton
				v-if="isLastStepActive"
				:is-loading="customerCreateMutation.isLoading.value"
				@click="onSubmitButtonClick"
			>
				{{ t('shared.submit') }}
			</AppButton>
		</template>

		<template #default>
			<AppForm :form="form">
				<CustomersCreateCompanyInformationStep
					v-if="isStepActive('company-information')"
					:form="form"
					:sales-consultants="salesConsultants"
				/>
				<CustomersCreateContactPersonStep
					v-if="isStepActive('contact-person')"
					:form="form"
				/>
				<CustomersCreateInvoiceInformationStep
					v-if="isStepActive('invoice-information')"
					:form="form"
				/>
			</AppForm>
		</template>
	</AppFormPage>
</template>
