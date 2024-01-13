import { useAttrs } from 'vue'

type UseComponentEvents = () => Record<string, Function>

export function useComponentEvents(): UseComponentEvents {
	const attrs = useAttrs()

	const eventListeners = Object.entries(attrs).reduce<Record<string, Function>>((acc, [key, value]) => {
		if (typeof value === 'function' && key.startsWith('on')) {
			acc[key] = value
		}

		return acc
	}, {})

	return eventListeners
}
