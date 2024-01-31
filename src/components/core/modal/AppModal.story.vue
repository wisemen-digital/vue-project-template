<script setup lang="ts">
import { reactive } from 'vue'

import AppButton from '@/components/core/button/AppButton.vue'
import type { ModalProps } from '@/components/core/modal/appModal.style'
import { modalSizeOptions } from '@/components/core/modal/appModal.style'
import AppModal from '@/components/core/modal/AppModal.vue'
import AppModalContent from '@/components/core/modal/AppModalContent.vue'
import AppModalDescription from '@/components/core/modal/AppModalDescription.vue'
import AppModalFooter from '@/components/core/modal/AppModalFooter.vue'
import AppModalHeader from '@/components/core/modal/AppModalHeader.vue'
import AppModalTitle from '@/components/core/modal/AppModalTitle.vue'

interface State {
	isOpen: boolean
	hideCloseButton?: boolean
	hasIrremovableMask?: boolean
	title?: string
	content?: string
	description?: string
	size?: ModalProps['size']
}

const state = reactive<State>({
	isOpen: false,
	hideCloseButton: false,
	hasIrremovableMask: false,
	title: 'Modal title',
	description: 'Description here',
	content:
		'Content here Lorem ipsum dolor sit amet consectetur adipisicing elit. Error temporibus nulla ab eius enim similique atque officia? Porro consectetur, ea iusto perspiciatis ullam nisi minus, inventore iste quisquam placeat nemo?Lorem ipsum dolor sit amet consectetur adipisicing elit. In quidem ullam ipsam minima, vitae commodi expedita corporis aliquid illum quis laudantium adipisci laboriosam est maxime quae enim aliquam sed ipsa.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam iste, adipisci sapiente odit beatae architecto aspernatur perferendis quis. Esse dicta, minima non aperiam sunt ad veniam ab velit officiis magni.',
})

function handleClick(): void {
	state.isOpen = true
}
</script>

<template>
	<Story title="Modals/AppModal">
		<Variant
			auto-props-disabled
			title="Default"
		>
			<template #controls>
				<HstCheckbox
					v-model="state.isOpen"
					title="Open"
				/>
				<HstCheckbox
					v-model="state.hideCloseButton"
					title="No close button"
				/>
				<HstCheckbox
					v-model="state.hasIrremovableMask"
					title="Not dismissable"
				/>
				<HstSelect
					v-model="state.size"
					:options="modalSizeOptions"
					title="Size"
				/>

				<HstText
					v-model="state.title"
					title="Title"
				/>
				<HstText
					v-model="state.description"
					title="Description"
				/>

				<HstTextarea
					v-model="state.content"
					title="Content"
				/>
			</template>

			<AppButton @click="handleClick"> Click me </AppButton>
			<AppModal
				v-model:is-open="state.isOpen"
				:has-irremovable-mask="state.hasIrremovableMask"
				:size="state.size"
			>
				<template #default="{ close }">
					<AppModalHeader
						:close="close"
						:hide-close-button="state.hideCloseButton"
					>
						<AppModalTitle>
							{{ state.title }}
						</AppModalTitle>
						<AppModalDescription>
							{{ state.content }}
						</AppModalDescription>
					</AppModalHeader>
					<AppModalContent>
						{{ state.content }}
					</AppModalContent>
					<AppModalFooter>
						<div class="flex justify-end gap-2">
							<AppButton
								variant="ghost"
								@click="close"
							>
								Cancel
							</AppButton>
							<AppButton @click="close"> Confirm </AppButton>
						</div>
					</AppModalFooter>
				</template>
			</AppModal>
		</Variant>
	</Story>
</template>
