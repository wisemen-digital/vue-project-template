import type { TransitionClasses } from '.'

export const modalTransition: TransitionClasses = {
	enterFromClass: 'md:scale-95 opacity-0 translate-y-20 md:translate-y-0',
	enterActiveClass: 'duration-200 md:transition-scale-bounce',
	enterToClass: 'scale-100 opacity-100',
	leaveFromClass: 'scale-100 opacity-100',
	leaveActiveClass: 'duration-200 md:transition-scale-bounce',
	leaveToClass: 'md:scale-95 opacity-0 translate-y-20 md:translate-y-0',

	enterFrom: 'md:scale-95 opacity-0 translate-y-20 md:translate-y-0',
	enter: 'duration-200 md:transition-scale-bounce',
	enterTo: 'scale-100 opacity-100',
	leaveFrom: 'scale-100 opacity-100',
	leave: 'duration-200 md:transition-scale-bounce',
	leaveTo: 'md:scale-95 opacity-0 translate-y-20 md:translate-y-0',
}

export const modalBackgroundTransition: TransitionClasses = {
	enter: 'duration-300 ease-out',
	enterFrom: 'opacity-0',
	enterTo: 'opacity-100',
	leave: 'duration-200 ease-in',
	leaveFrom: 'opacity-100',
	leaveTo: 'opacity-0',

	enterActiveClass: 'duration-300 ease-out',
	enterFromClass: 'opacity-0',
	enterToClass: 'opacity-100',
	leaveActiveClass: 'duration-200 ease-in',
	leaveFromClass: 'opacity-100',
	leaveToClass: 'opacity-0',
}
