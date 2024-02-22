<script setup lang="ts">
import AppContainer from '../AppContainer.vue'

const props = withDefaults(
	defineProps<{
		withoutHeader?: boolean
		numberOfRows?: number
	}>(),
	{
		withoutHeader: false,
		numberOfRows: 7,
	}
)
</script>

<template>
	<div class="w-full">
		<div
			v-if="!props.withoutHeader"
			class="mb-4 border-b border-t border-solid border-border pb-4"
		>
			<AppContainer class="grid grid-cols-table-skeleton gap-x-8 px-8">
				<div
					v-for="i of 4"
					:key="i"
					class="mt-4 rounded-md bg-neutral-50 p-3"
				/>
			</AppContainer>
		</div>

		<div class="relative">
			<div
				v-for="i of props.numberOfRows"
				:key="i"
				class="odd:bg-neutral-50"
			>
				<AppContainer class="grid grid-cols-table-skeleton gap-x-8 px-8 py-4">
					<div
						v-for="j of 4"
						:key="j"
						class="rounded-md bg-neutral-100 p-3"
					/>
				</AppContainer>
			</div>

			<div class="z-1 absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-white/50" />
		</div>
	</div>
</template>
