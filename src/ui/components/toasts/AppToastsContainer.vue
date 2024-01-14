<script setup lang="ts">
import { computed } from 'vue'

import AppText from '@/components/core/AppText.vue'
import { useToast } from '@/ui/composables/useToast.ts'

const { toast } = useToast()

const showToast = computed<boolean>(() => toast.value !== null)
</script>

<template>
	<Transition
		mode="out-in"
		name="toast-transition"
	>
		<div
			v-if="showToast && toast !== null"
			:key="toast.id"
			class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 overflow-hidden rounded-button bg-foreground px-3 py-1 text-subtext"
		>
			<AppText
				class="relative z-10 text-background"
				variant="subtext"
			>
				{{ toast.message }}
			</AppText>

			<!-- Progress -->
			<div class="absolute bottom-0 left-0 h-[2px] animate-to-full-width bg-neutral-300" />
		</div>
	</Transition>
</template>

<style scoped lang="scss">
.toast-transition {
	&-enter-active,
	&-leave-active {
		transition: 0.3s;
	}

	// &-enter-from,
	// &-leave-to {
	// 	opacity: 0;
	// }

	&-enter-from,
	&-leave-to {
		opacity: 0;
		transform: translate(-50%, 150%) scale(0.98);
	}
}
</style>
