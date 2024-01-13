import type { Ref } from 'vue'

interface UsePageLoaderReturnType {
  isLoading: Readonly<Ref<boolean>>
  setIsLoading: (value: boolean) => void
}

const isLoading = ref<boolean>(false)

export function usePageLoader(): UsePageLoaderReturnType {
  const setIsLoading = (value: boolean): void => {
    isLoading.value = value
  }

  return {
    isLoading: readonly(isLoading),
    setIsLoading,
  }
}
