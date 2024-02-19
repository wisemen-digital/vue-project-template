import type { ComputedRef } from 'vue'

import type { Icon } from '@/icons/icons'

export interface FormStep {
	id: string
	icon: Icon
	label: string
	isCompleted: boolean
	hasError: ComputedRef<boolean>
}
