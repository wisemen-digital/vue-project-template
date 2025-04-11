import { searchCollectionsV1 } from '@/client'
import { GlobalSearchCareTransformer } from '@/models/global-search/globalSearch.transformer.ts'
import type { GlobalSearchIndex } from '@/models/global-search/globalSearchIndex.model.ts'

export class GlobalSearchService {
  static async find(search: string):
  Promise<GlobalSearchIndex[]> {
    const response = await searchCollectionsV1({
      query: {
        filter: { collections: [] },
        search,
      },
      responseValidator: undefined,
    })

    return response.data.items.map(GlobalSearchCareTransformer.fromDto)
  }
}
