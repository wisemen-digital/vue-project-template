import type {
  GetEventLogsResponse,
} from '@/client'

export type SettingLogIndexDto = GetEventLogsResponse['items'][number]
