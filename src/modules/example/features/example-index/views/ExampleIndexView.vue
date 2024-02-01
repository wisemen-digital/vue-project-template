<script setup lang="ts">
import AppPage from '@/components/app/AppPage.vue'
import AppButton from '@/components/core/button/AppButton.vue'
import AppInput from '@/components/core/input/AppInput.vue'
import { useTypedRouter } from '@/composables/core/typedRouter.composable'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()
const router = useTypedRouter()

function logout(): void {
	authStore.logout()

	router.replace({
		name: 'login',
	})
}
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
