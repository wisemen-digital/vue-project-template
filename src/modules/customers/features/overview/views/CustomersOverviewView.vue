<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppInput from '@/components/core/input/AppInput.vue'
import CustomersOverviewTable from '@/modules/customers/features/overview/components/CustomersOverviewTable.vue'

const { t } = useI18n()
</script>

<template>
	<AppPage
		:subtitle="t('customers.view_and_manage')"
		:title="t('shared.customers')"
	>
		<template #actions>
			<AppInput
				icon-left="search"
				model-value=""
				:placeholder="t('customers.search')"
			/>
			<AppButton
				icon-left="plus"
				:to="{ name: 'customers-create' }"
			>
				{{ t('customers.create') }}
			</AppButton>
		</template>

		<template #default>
			<CustomersOverviewTable />
		</template>
	</AppPage>
</template>
