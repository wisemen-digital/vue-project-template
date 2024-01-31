import type { TransitionClasses } from '.'

export const snackbarTransition: TransitionClasses = {
	moveClass: 'transition-all ease duration-500',
	enterActiveClass: 'transition-all ease duration-500',
	leaveActiveClass: 'transition-all ease duration-500 absolute',

	enterFromClass: 'scale-0 opacity-0',
	leaveToClass: 'scale-0 opacity-0',
}
