<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppPage from '@/components/app/AppPage.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppInput from '@/components/core/input/AppInput.vue'
import ClientsOverviewTable from '@/modules/clients/features/overview/components/ClientsOverviewTable.vue'

const { t } = useI18n()
</script>

<template>
	<AppPage
		:subtitle="t('clients.view_and_manage')"
		:title="t('shared.clients')"
	>
		<template #actions>
			<AppInput
				icon-left="search"
				model-value=""
				:placeholder="t('clients.search')"
			/>
			<AppButton
				icon-left="plus"
				:to="{ name: 'clients-create' }"
			>
				{{ t('clients.create') }}
			</AppButton>
		</template>

		<template #default>
			<ClientsOverviewTable />
		</template>
	</AppPage>
</template>
