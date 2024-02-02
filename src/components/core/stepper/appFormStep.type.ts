import type { Icon } from '@/icons'

export interface FormStep {
	id: string
	icon: Icon
	label: string
	isCompleted: boolean
	hasError: boolean
}
