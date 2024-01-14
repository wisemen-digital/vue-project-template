import { useAttrs } from 'vue'

type UseComponentEvents = () => Record<string, () => void>

export function useComponentEvents(): UseComponentEvents {
	const attrs = useAttrs()

	return Object.entries(attrs).reduce<Record<string, () => void>>((acc, [key, value]) => {
		if (typeof value === 'function' && key.startsWith('on')) {
			acc[key] = value
		}

		return acc
	}, {})
}
