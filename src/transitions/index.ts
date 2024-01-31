export interface TransitionClasses {
	enterFromClass?: string
	enterActiveClass?: string
	enterToClass?: string
	leaveFromClass?: string
	leaveActiveClass?: string
	leaveToClass?: string
	moveClass?: string

	enterFrom?: string
	enter?: string
	enterTo?: string
	leaveFrom?: string
	leave?: string
	leaveTo?: string
	move?: string
}

export * from '@/transitions/fade.transition'
export * from '@/transitions/list.transition'
export * from '@/transitions/modal.transition'
export * from '@/transitions/popover.transition'
export * from '@/transitions/scaleBounce.transition'
export * from '@/transitions/snackbar.transition'
export * from '@/transitions/staticList.transition'
