<script setup lang="ts">
import AppPage from '@/components/app/AppPage.vue'
import { useTypedRouter } from '@/composables/core/typedRouter.composable'
import { useAuthStore } from '@/stores/auth.store.ts'
import AppButton from '@/ui/components/button/AppButton.vue'

const authStore = useAuthStore()
const router = useTypedRouter()

function logout(): void {
	authStore.logout()

	router.replace({
		name: 'login-form',
	})
}
</script>

<template>
	<AppPage title="Example">
		<div>
			<AppButton @click="logout"> Log out </AppButton>
		</div>
	</AppPage>
</template>
