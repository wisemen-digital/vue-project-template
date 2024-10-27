import type { ComputedRef, Ref } from 'vue'

export type RefOrGetter<T> = (() => T) | ComputedRef<T> | Ref<T>
