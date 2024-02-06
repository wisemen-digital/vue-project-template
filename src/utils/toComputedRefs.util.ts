import type { ComputedRef } from 'vue'
import { toRefs } from 'vue'

export function toComputedRefs<T extends Record<string, T[keyof T]>>(obj: T): { [K in keyof T]: ComputedRef<T[K]> } {
	return toRefs(obj) as unknown as { [K in keyof T]: ComputedRef<T[K]> }
}
