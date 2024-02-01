<script setup lang="ts">
import AppPage from '@/components/app/AppPage.vue'
import AppInput from '@/components/core/input/AppInput.vue'
import AppButton from '@/components/core/button/AppButton.vue'
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

		<template #default> hier komt een table </template>
	</AppPage>
</template>
