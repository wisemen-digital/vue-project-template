<script setup lang="ts">
import AppTableExample from '@/AppTableExample.vue'
import AppPage from '@/components/app/AppPage.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppInput from '@/components/core/input/AppInput.vue'
</script>

<template>
	<AppPage title="Klanten">
		<template #actions>
			<AppInput
				icon-left="search"
				model-value=""
				placeholder="Zoek klant"
			/>
			<AppButton> Nieuwe klant </AppButton>
		</template>

		<template #default>
			<AppTableExample />
		</template>
	</AppPage>
</template>
