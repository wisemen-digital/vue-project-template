import {
  http,
  HttpResponse,
} from 'msw'

import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.ts'
import type { UserIndexDto } from '@/models/user/index/userIndexDto.model.ts'
import { SettingsPreferenceDtoBuilder } from '@/modules/settings/models/preference/settingsPreferenceDto.builder.ts'
import type { SettingsPreferenceDto } from '@/modules/settings/models/preference/settingsPreferenceDto.model.ts'
import type { PaginatedDtoData } from '@/types/paginatedData.type.ts'

export function getPaginatedJson<T>(response: T[]): PaginatedDtoData {
  return {
    items: response,
    meta: {
      limit: response.length,
      offset: 0,
      total: response.length,
    },
  }
}

const users: UserIndexDto[] = [
  new UserIndexDtoBuilder()
    .withFirstName('John')
    .withLastName('Doe')
    .build(),
  new UserIndexDtoBuilder()
    .withFirstName('Jane')
    .withLastName('Johnson')
    .build(),
]

const PREFERENCE: SettingsPreferenceDto = new SettingsPreferenceDtoBuilder().build()

export const userHandlers = [
  http.get('*/api/v1/users/*/preferences', () => {
    return HttpResponse.json(PREFERENCE)
  }),

  http.get('*/api/v1/users*', ({ request }) => {
    const url = new URL(request.url)

    if (url.pathname === '/api/v1/users/me') {
      return
    }

    return HttpResponse.json(getPaginatedJson(users))
  }),

]
