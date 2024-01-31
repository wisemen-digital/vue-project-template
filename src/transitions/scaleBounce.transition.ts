import type { TransitionClasses } from '.'

export const scaleBounceTransition: TransitionClasses = {
	enterFromClass: 'scale-0 opacity-0',
	enterActiveClass: 'transition-scale-bounce',
	enterToClass: 'scale-100 opacity-100',
	leaveFromClass: 'scale-100 opacity-100',
	leaveActiveClass: 'transition-scale-bounce',
	leaveToClass: 'scale-0 opacity-0',

	enterFrom: 'scale-0 opacity-0',
	enter: 'transition-scale-bounce',
	enterTo: 'scale-100 opacity-100',
	leaveFrom: 'scale-100 opacity-100',
	leave: 'transition-scale-bounce',
	leaveTo: 'scale-0 opacity-0',
}
