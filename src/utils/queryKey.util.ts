import {
  QueryKeys,
  QueryKeyToInvalidate,
} from '@/types/query/queryKey.type'

export function generateQueryKey<TQueryKey extends keyof QueryKeys, TResData>(
  queryKey: QueryKeyToInvalidate<TQueryKey, TResData>,
  data: TResData,
): unknown[] {
  // Query key as just a string
  if ('key' in queryKey && !('params' in queryKey)) {
    return [
      queryKey.key,
    ]
  }
  // Query key with params
  if ('key' in queryKey && 'params' in queryKey) {
    const params = Object.values(queryKey.params).map((param) => {
      if (typeof param === 'function') {
        return param(data)
      }
      return param
    })

    const queryKeyArray = [
      queryKey.key,
      ...Object.values(params),
    ]

    return queryKeyArray
  }

  return []
}
