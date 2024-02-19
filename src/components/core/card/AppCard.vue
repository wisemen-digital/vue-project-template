<script setup lang="ts">
import AppText from '@/components/core/text/AppText.vue'

const { content, footer, headerImage, subtitle, title } = defineProps<{
	/**
	 * The main content of the card.
	 */
	content?: string

	/**
	 * The title of the card.
	 */
	title?: string

	/**
	 * The subtitle of the card.
	 */
	subtitle?: string

	/**
	 * The footer of the card.
	 */
	footer?: string

	/**
	 * The image to display on the header of the card.
	 */
	headerImage?: string
}>()

defineSlots<{
	content?: () => void
	header?: () => void
	default?: () => void
	footer?: () => void
	headerImage?: () => void
}>()
</script>

<template>
	<section
		class="flex flex-col overflow-hidden rounded-card border bg-card text-card-foreground shadow-card-shadow transition-shadow duration-300 hover:shadow-card-hover-shadow focus:shadow-card-hover-shadow"
	>
		<slot>
			<slot name="headerImage">
				<img
					v-if="headerImage"
					class="h-48 w-full object-cover"
					:src="headerImage"
				/>
			</slot>
			<div class="flex flex-col gap-4 p-4">
				<slot name="header">
					<div v-if="title || subtitle">
						<AppText
							v-if="title"
							boldness="semibold"
							variant="heading"
						>
							{{ title }}
						</AppText>
						<AppText
							v-if="subtitle"
							class="text-muted-foreground"
						>
							{{ subtitle }}
						</AppText>
					</div>
				</slot>
				<slot name="content">
					<AppText v-if="content">
						{{ content }}
					</AppText>
				</slot>
				<slot name="footer">
					<AppText v-if="footer">
						{{ footer }}
					</AppText>
				</slot>
			</div>
		</slot>
	</section>
</template>
