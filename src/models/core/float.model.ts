import type { FloatProps as HeadlessFloatProps } from '@headlessui-float/vue'

export interface FloatProps {
	/**
	 * The placement of the menu, default bottom-end.
	 */
	placement?: HeadlessFloatProps['placement']
	/**
	 * Whether the menu should adapt its width to the content.
	 */
	hasAdaptiveWidth?: HeadlessFloatProps['adaptiveWidth']
	/**
	 * Whether the menu has no offset.
	 */
	hasNoOffset?: boolean
	/**
	 * Whether the menu should sheft when it reaches the viewport bounds.
	 */
	hasNoShift?: boolean
	/**
	 * Whether the menu should flip when it reaches the viewport bounds.
	 */
	hasNoFlip?: boolean
	/**
	 * Whether the menu should automatically place itself.
	 */
	hasAutoPlacement?: boolean
}
