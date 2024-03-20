import { useRouteQuery } from '@vueuse/router'
import type { Ref } from 'vue'
import { watch } from 'vue'

export interface TabQueryParams {
  selectedTab: Ref<null | number>
  tabId?: null | string
}

export function useTabQuery({ selectedTab, tabId = null }: TabQueryParams): void {
  const query = useRouteQuery<string>(`tab-${tabId ?? 'default'}`)
  let isInitialized = false

  if (query !== null) {
    selectedTab.value = Number(query.value)
  }

  function setTabQuery(value: null | number): void {
    query.value = value?.toString() ?? ''
  }

  watch(
    query,
    (value) => {
      if (value === null) {
        return
      }

      isInitialized = true
      selectedTab.value = Number(value)
    },
    { immediate: true },
  )

  watch(selectedTab, (value) => {
    if (!isInitialized) {
      return
    }

    setTabQuery(value)
  })
}
