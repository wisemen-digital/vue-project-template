<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
import { RouterLink } from 'vue-router'

import AppIcon from '@/components/core/icon/AppIcon.vue'
import { menuItemVariants } from '@/components/core/menu/appMenuItem.style'
import AppTextDescription from '@/components/core/text/AppTextDescription.vue'
import type { MenuItemProps } from '@/types/core/menu.type'

interface MenuItemSlotProps {
	/**
	 * If the menu item is active.
	 */
	active: boolean
	/**
	 * If the menu item is disabled.
	 */
	disabled: boolean
	/**
	 * Close the menu.
	 */
	close: () => void
}

const { iconLeft, isDisabled, text, description, onSelect } = defineProps<MenuItemProps>()
const emits = defineEmits<{
	click: []
}>()

function handleClick(): void {
	if (isDisabled) {
		return
	}

	onSelect?.()
	emits('click')
}
</script>

<template>
	<MenuItem
		v-slot="{ active, disabled, close }: MenuItemSlotProps"
		:disabled="isDisabled"
	>
		<Component
			:is="to ? RouterLink : 'button'"
			:class="
				menuItemVariants({
					isDisabled,
					isActive: active,
				})
			"
			disabled
			:to="to"
			@click="handleClick"
		>
			<slot
				:active="active"
				:close="close"
				:is-disabled="isDisabled"
				name="element"
			>
				<slot name="left" />
				<div class="flex items-center gap-2">
					<slot name="icon-left">
						<AppIcon
							v-if="iconLeft"
							class="mr-2"
							:icon="iconLeft"
							size="sm"
						/>
					</slot>
					<slot
						:close="close"
						:is-active="active"
						:is-disabled="disabled || isDisabled"
					>
						<AppTextDescription
							:description="description"
							:text="text"
						/>
					</slot>
				</div>
				<slot name="right" />
			</slot>
		</Component>
	</MenuItem>
</template>
