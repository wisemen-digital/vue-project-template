import { useLocalStorage } from '@vueuse/core'
import { useDebounceSearch } from '@wisemen/vue-core'
import type { Icon } from '@wisemen/vue-core-components'
import type {
  ComputedRef,
  Ref,
} from 'vue'
import {
  computed,
  ref,
} from 'vue'
import { useI18n } from 'vue-i18n'

import { useGlobalSearchIndexQuery } from '@/api/global-search/queries/globalSearchIndex.query.ts'
import { GlobalSearchCollectionName } from '@/client'
import { useCommandMenuActionItems } from '@/components/layout/header/commandAction.composable.ts'
import type { GlobalSearchIndex } from '@/models/global-search/globalSearchIndex.model.ts'
import type { RouteLocationCurrent } from '@/types/global/vueRouter'

export interface CommandMenuItem<TId = string> {
  id: TId
  breadcrumbs: string[]
  icon: Icon
  label: string
  to: RouteLocationCurrent
}

interface UseCommandMenuReturnType {
  isFetching: ComputedRef<boolean>
  isHighlighted: (id: string) => boolean
  clearRecentSearches: () => void
  items: ComputedRef<CommandMenuItem[]>
  recentSearches: ComputedRef<CommandMenuItem[]>
  searchTerm: Ref<string>
  onClick: (id: CommandMenuItem) => void
  onHighlight: (id: string | null) => void
}

export function useCommandMenu(): UseCommandMenuReturnType {
  const i18n = useI18n()
  const commandMenuActionItems = useCommandMenuActionItems()

  const isFetching = ref<boolean>(false)

  const debounceSearchTerm = ref<string>('')
  const highlightedItemId = ref<string | null>(null)

  const recentSearches = useLocalStorage<CommandMenuItem[]>('recentGlobalSearch', [])

  const debounceSearch = useDebounceSearch({
    onDebounceSearch: (value: string) => {
      debounceSearchTerm.value = value
    },
  })

  const indexQuery = useGlobalSearchIndexQuery(computed<string>(() => debounceSearchTerm.value))

  const globalSearchItems = computed<GlobalSearchIndex[]>(() => indexQuery.data.value ?? [])

  const settingItems = computed<CommandMenuItem[]>(() => {
    return commandMenuActionItems.value.filter((item) => {
      const searchableValue = item.label + item.breadcrumbs.join(' ')

      return searchableValue.toLowerCase().includes(debounceSearchTerm.value.toLowerCase())
    })
  })

  const commandMenuItems = computed<CommandMenuItem[]>(() => {
    const result: CommandMenuItem[] = []

    if (settingItems.value.length > 0) {
      result.push(...settingItems.value)
    }

    if (globalSearchItems.value.length > 0) {
      result.push(...globalSearchItems.value.map((item) => {
        return {
          id: item.entity.uuid,
          breadcrumbs: getBreadcrumbs(item),
          icon: getIcon(item),
          label: item.entity.name,
          to: getRoute(item),
        }
      }))
    }

    if (debounceSearchTerm.value.length === 0) {
      return recentSearches.value
    }

    if (result.length === 0 && debounceSearchTerm.value.length > 0) {
      return []
    }

    return result
  })

  function getBreadcrumbs(item: GlobalSearchIndex): string[] {
    const breadcrumbs: string[] = []

    if (item.entity.type === GlobalSearchCollectionName.USER) {
      breadcrumbs.push(i18n.t('shared.user'))
    }

    if (item.entity.meta !== null) {
      breadcrumbs.push(item.entity.meta)
    }

    return breadcrumbs
  }

  function onHighlight(id: string | null): void {
    highlightedItemId.value = id
  }

  function isHighlighted(uuid: string): boolean {
    return uuid === highlightedItemId.value
  }

  function clearRecentSearches(): void {
    recentSearches.value = []
  }

  function onClick(item: CommandMenuItem): void {
    if (recentSearches.value.some((i) => i.id === item.id)) {
      return
    }

    if (recentSearches.value.length >= 5) {
      recentSearches.value.shift()
    }

    recentSearches.value.push(item)
  }

  return {
    isFetching: computed<boolean>(() => {
      return isFetching.value || debounceSearch.isDebouncing.value || indexQuery.isFetching.value
    }),
    isHighlighted,
    clearRecentSearches,
    items: commandMenuItems,
    recentSearches: computed<CommandMenuItem[]>(() => recentSearches.value),
    searchTerm: debounceSearch.search,
    onClick,
    onHighlight,
  }
}

function getRoute(item: GlobalSearchIndex): RouteLocationCurrent {
  if (item.entity.type === GlobalSearchCollectionName.USER) {
    return {
      name: 'user-detail',
      params: { userUuid: item.entity.uuid },
    }
  }

  throw new Error(`No route found for entity type: ${item.entity}`)
}

function getIcon(item: GlobalSearchIndex): Icon {
  if (item.entity.type === GlobalSearchCollectionName.USER) {
    return 'barChartSquare'
  }

  throw new Error(`No icon found for entity type: ${item.entity}`)
}
