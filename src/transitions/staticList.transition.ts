import type { TransitionClasses } from '.'

export const staticList: TransitionClasses = {
	moveClass: 'transition-all ease duration-500',
	enterActiveClass: 'transition-all ease duration-500',
	leaveActiveClass: 'transition-all ease duration-500 absolute',

	enterFromClass: 'translate-x-8 opacity-0',
	leaveToClass: 'translate-x-8 opacity-0',
}
