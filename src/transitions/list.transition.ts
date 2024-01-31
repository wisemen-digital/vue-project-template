import type { TransitionClasses } from '.'

export const listTransition: TransitionClasses = {
	moveClass: 'transition-all ease duration-500',
	enterActiveClass: 'transition-all ease duration-500',
	leaveActiveClass: 'transition-all ease duration-500 absolute',

	enterFromClass: 'opacity-0',
	leaveToClass: 'opacity-0',
}
