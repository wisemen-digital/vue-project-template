import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import { watch } from 'vue'

const LOCAL_STORAGE_KEY = 'reduce-motion'

export function useReduceMotionValue(): Ref<boolean> {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return useLocalStorage<boolean>(LOCAL_STORAGE_KEY, prefersReducedMotion)
}

export function useReduceMotion(): void {
  const reduceMotion = useReduceMotionValue()

  watch(reduceMotion, (reduceMotion) => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion')
    }
    else {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, { immediate: true })
}
