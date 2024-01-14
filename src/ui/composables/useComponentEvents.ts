/* eslint-disable @typescript-eslint/ban-types */
import { useAttrs } from 'vue'

type UseComponentEvents = () => Record<string, Function>

//TODO hebben wij deze nodig?
export function useComponentEvents(): UseComponentEvents {
	const attrs = useAttrs()

	return Object.entries(attrs).reduce<Record<string, Function>>((acc, [key, value]) => {
		if (typeof value === 'function' && key.startsWith('on')) {
			acc[key] = value
		}

		return acc
	}, {})
}
