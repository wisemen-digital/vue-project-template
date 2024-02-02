<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/components/core/button/AppButton.vue'
import AppModal from '@/components/core/modal/AppModal.vue'

const { src, alt } = defineProps<{
	src: string
	alt?: string | null
}>()

const emit = defineEmits<{
	close: []
}>()

const { t } = useI18n()
</script>

<template>
	<AppModal @close="emit('close')">
		<div class="h-[80vh] w-[80vw]">
			<div class="absolute left-0 top-0 flex w-full justify-end p-4">
				<AppButton
					class="h-9"
					:href="src"
					variant="secondary"
				>
					{{ t('components.image.open_in_new_tab') }}
				</AppButton>
			</div>

			<img
				:alt="alt ?? undefined"
				:src="src"
			/>
		</div>
	</AppModal>
</template>
