<script setup lang="ts">
import AppPage from '@/components/app/AppPage.vue'
import AppImage from '@/components/core/AppImage.vue'
import { useTypedRouter } from '@/composables/core/typedRouter.composable'
import { useAuthStore } from '@/stores/auth.store.ts'
import AppButton from '@/ui/components/button/AppButton.vue'

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
	<AppPage title="Example">
		<div>
			<AppButton @click="logout"> Log out </AppButton>
		</div>

		<AppImage
			class="size-8"
			src="https://vuejs.org/images/logo.png"
		/>
	</AppPage>
</template>
