import {
  http,
  HttpResponse,
} from 'msw'

import { UserIndexDtoBuilder } from '@/models/user/index/userIndexDto.builder.ts'
import type { UserIndexDto } from '@/models/user/index/userIndexDto.model.ts'
import { SettingPreferenceDtoBuilder } from '@/modules/setting/models/preference/settingPreferenceDto.builder.ts'
import type { SettingPreferenceDto } from '@/modules/setting/models/preference/settingPreferenceDto.model.ts'
import type { PaginatedDtoData } from '@/types/paginatedData.type.ts'

function getPaginatedJson<T>(response: T[]): PaginatedDtoData {
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

const PREFERENCE: SettingPreferenceDto = new SettingPreferenceDtoBuilder().build()

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
