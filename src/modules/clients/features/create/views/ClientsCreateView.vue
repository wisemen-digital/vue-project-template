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
import type { ClientCreateForm } from '@/models/clients/clientCreateForm.model.ts'
import { clientCreateFormSchema } from '@/models/clients/clientCreateForm.model.ts'
import type { SalesConsultant } from '@/models/clients/salesConsultant.model.ts'
import { useClientCreateMutation } from '@/modules/clients/api/mutations/clientCreate.mutation.ts'
import ClientsCreateCompanyInformationStep from '@/modules/clients/features/create/components/ClientsCreateCompanyInformationStep.vue'
import ClientsCreateContactPersonStep from '@/modules/clients/features/create/components/ClientsCreateContactPersonStep.vue'
import ClientsCreateInvoiceInformationStep from '@/modules/clients/features/create/components/ClientsCreateInvoiceInformationStep.vue'
import { logInfo } from '@/utils/logger.util.ts'

const { t } = useI18n()
const toast = useToast()
const clientCreateMutation = useClientCreateMutation()

const { onSubmitForm, form } = useForm({ schema: clientCreateFormSchema })

const steps = computed<FormStep[]>(() => {
	return [
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
			label: t('shared.billing_information'),
			icon: 'creditCard',
			hasError: computed<boolean>(() => Number(form.errors.billingInformation?._errors) > 0),
			isCompleted: false,
		},
	]
})

const { nextStep, previousStep, onStepClick, isStepActive, activeStepId, isLastStepActive, isFirstStepActive } =
	useFormStepper({ steps: steps })

const salesConsultants = ref<SalesConsultant[]>([])

// const formState = computed(() => form.state)
// const { setSnapshot } = useUnsavedChanges(formState)

function onSubmitButtonClick(): void {
	form.submit()
}

onSubmitForm(async (form: ClientCreateForm) => {
	logInfo('Form submitted', form)

	try {
		await clientCreateMutation.execute({ body: form })
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
		:navigation-label="t('clients.back_to_overview')"
		:subtitle="t('clients.create_subtitle')"
		:title="t('clients.new')"
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
				:to="{ name: 'clients-overview' }"
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
				:is-loading="clientCreateMutation.isLoading.value"
				@click="onSubmitButtonClick"
			>
				{{ t('shared.submit') }}
			</AppButton>
		</template>

		<template #default>
			<AppForm :form="form">
				<ClientsCreateCompanyInformationStep
					v-if="isStepActive('company-information')"
					:form="form"
					:sales-consultants="salesConsultants"
				/>
				<ClientsCreateContactPersonStep
					v-if="isStepActive('contact-person')"
					:form="form"
				/>
				<ClientsCreateInvoiceInformationStep
					v-if="isStepActive('invoice-information')"
					:form="form"
				/>
			</AppForm>
		</template>
	</AppFormPage>
</template>
