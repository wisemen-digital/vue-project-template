import type { ComputedRef } from 'vue'
import {
  computed,
  onMounted,
  ref,
} from 'vue'

type UseIsMountedReturnType = ComputedRef<boolean>

/**
 * A simple composable that returns a boolean ref that is true when the component is mounted.
 * @returns {UseIsMountedReturnType} isMounted - A boolean computedRef that is true when the component is mounted.
 */
export function useIsMounted(): UseIsMountedReturnType {
  const isMounted = ref<boolean>(false)

  onMounted(() => {
    isMounted.value = true
  })

  return computed<boolean>(() => isMounted.value)
}
