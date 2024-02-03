<script setup lang="ts">
import AppButton from '@/components/core/button/AppButton.vue'
import AppText from '@/components/core/text/AppText.vue'

const props = defineProps<{
	title: string
	subtitle: string
	navigationLabel: string
}>()
</script>

<template>
	<div class="relative flex w-full flex-1">
		<div class="w-[360px] bg-muted-background">
			<div class="sticky top-14 flex flex-col gap-8 bg-muted-background px-12 py-8">
				<div>
					<AppButton
						icon-left="arrowLeft"
						:to="{ name: 'clients-overview' }"
						variant="ghost"
					>
						{{ props.navigationLabel }}
					</AppButton>
				</div>
				<div class="flex-1">
					<slot name="stepper" />
				</div>
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-[800px] flex-col px-12 py-8">
			<div class="mb-8 flex items-center justify-between">
				<div>
					<AppText variant="title">
						{{ props.title }}
					</AppText>
					<AppText variant="body">
						{{ props.subtitle }}
					</AppText>
				</div>
				<div class="flex items-center justify-end gap-2">
					<slot name="actions" />
				</div>
			</div>
			<slot />
		</div>
	</div>
</template>
