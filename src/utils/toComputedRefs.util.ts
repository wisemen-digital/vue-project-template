import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export function toComputedRefs<T extends Record<string, T[keyof T]>>(obj: T): { [K in keyof T]: ComputedRef<T[K]> } {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => {
			acc[key as keyof T] = computed<T[keyof T]>(() => value)
			return acc
		},
		{} as { [K in keyof T]: ComputedRef<T[K]> }
	)
}
