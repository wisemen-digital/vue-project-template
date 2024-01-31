<script setup lang="ts">
import { reactive } from 'vue'

import Image from '@/assets/test-image.jpg'
import AppButton from '@/components/core/button/AppButton.vue'
import AppCard from '@/components/core/card/AppCard.vue'
import AppCardContent from '@/components/core/card/AppCardContent.vue'
import AppCardDescription from '@/components/core/card/AppCardDescription.vue'
import AppCardFooter from '@/components/core/card/AppCardFooter.vue'
import AppCardHeader from '@/components/core/card/AppCardHeader.vue'
import AppCardHeaderImage from '@/components/core/card/AppCardHeaderImage.vue'
import AppCardTitle from '@/components/core/card/AppCardTitle.vue'

interface State {
	title?: string
	subtitle?: string
	content?: string
	footer?: string
	headerImage: string

	hasFooterButton?: boolean
	hasHeaderImage?: boolean
	hasHeader?: boolean
	hasFooter?: boolean
	hasContent?: boolean
	isCustom?: boolean
}

const state = reactive<State>({
	title: 'Modal title',
	subtitle: 'Modal subtitle',
	content: 'Modal content',
	headerImage: Image,
	hasHeaderImage: true,
	hasContent: true,
	hasFooter: true,
	hasHeader: true,
	isCustom: false,
})
</script>

<template>
	<Story title="Card/AppCard">
		<Variant
			auto-props-disabled
			title="Default"
		>
			<template #controls>
				<HstText
					v-model="state.title"
					title="Title"
				/>
				<HstText
					v-model="state.subtitle"
					title="Subtitle"
				/>
				<HstText
					v-model="state.footer"
					title="Footer"
				/>
				<HstTextarea
					v-model="state.content"
					title="Content"
				/>

				<HstCheckbox
					v-model="state.hasHeader"
					title="Has header"
				/>
				<HstCheckbox
					v-model="state.hasHeaderImage"
					title="Has header image"
				/>
				<HstCheckbox
					v-model="state.hasContent"
					title="Has content"
				/>
				<HstCheckbox
					v-model="state.hasFooter"
					title="Has footer"
				/>
			</template>

			<div class="w-96 p-12">
				<AppCard>
					<AppCardHeaderImage
						v-if="state.hasHeaderImage"
						:src="state.headerImage"
					/>
					<AppCardHeader v-if="state.hasHeader">
						<AppCardTitle>
							{{ state.title }}
						</AppCardTitle>
						<AppCardDescription>
							{{ state.subtitle }}
						</AppCardDescription>
					</AppCardHeader>
					<AppCardContent v-if="state.hasContent">
						<p>{{ state.content }}</p>
					</AppCardContent>
					<AppCardFooter v-if="state.hasFooter">
						<AppButton class="w-full"> Button </AppButton>
					</AppCardFooter>
				</AppCard>
			</div>
		</Variant>
	</Story>
</template>
