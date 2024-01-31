import type { TransitionClasses } from '.'

export const fadeTransition: TransitionClasses = {
	enterActiveClass: 'transition-opacity ease duration-300',
	leaveActiveClass: 'transition-opacity ease duration-300',
	enterFromClass: 'opacity-0',
	leaveToClass: 'opacity-0',
}

export const widthExpand: TransitionClasses = {
	enterActiveClass: 'transition-all ease duration-500',
	leaveActiveClass: 'transition-all ease duration-500',
	enterFromClass: 'w-0 text-red-500',
	leaveToClass: 'w-0 text-red-500',
}
