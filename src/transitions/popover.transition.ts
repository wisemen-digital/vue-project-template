import type { TransitionClasses } from '.'

export const popoverTransition: TransitionClasses = {
	enterFromClass: 'opacity-0 shadow-none -translate-y-2',
	enterActiveClass: 'ease-native duration-200',
	enterToClass: 'opacity-100',
	leaveFromClass: 'opacity-100',
	leaveActiveClass: 'ease-native duration-200',
	leaveToClass: 'opacity-0 shadow-none -translate-y-2',

	enterFrom: 'opacity-0 shadow-none -translate-y-2',
	enter: 'ease-native duration-200',
	enterTo: 'opacity-100',
	leaveFrom: 'opacity-100',
	leave: 'ease-native duration-200',
	leaveTo: 'opacity-0 shadow-none -translate-y-2',
}
