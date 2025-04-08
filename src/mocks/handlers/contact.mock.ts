import {
  http,
  HttpResponse,
} from 'msw'

import { ContactIndexDtoBuilder } from '@/models/contact/index/contactIndexDto.builder'
import type { ContactIndexDto } from '@/models/contact/index/contactIndexDto.model'
import { PaginationUtil } from '@/utils/pagination.util.ts'

const contacts: ContactIndexDto[] = [
  new ContactIndexDtoBuilder()
    .withFirstName('John')
    .withLastName('Doe')
    .withEmail('john.doe@email.com')
    .withPhone('+1 234 567 890')
    .build(),
  new ContactIndexDtoBuilder()
    .withFirstName('Jane')
    .withLastName('Smith')
    .withEmail('jane.smith@email.com')
    .withPhone('+1 987 654 321')
    .build(),
]

export const contactHandlers = [
  http.get('*/api/v1/contacts', () => {
    return HttpResponse.json(PaginationUtil.getJson(contacts))
  }),

  http.get('*/api/v1/contacts/:uuid', ({ params }) => {
    const { uuid } = params
    const contact = contacts.find((c) => c.uuid === uuid)

    if (!contact) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(contact)
  }),

  http.post('*/api/v1/contacts', async ({ request }) => {
    const body = await request.json() as ContactIndexDto

    const contact = {
      ...body,
      uuid: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    contacts.push(contact as ContactIndexDto)

    return HttpResponse.json(contact, { status: 201 })
  }),

  http.put('*/api/v1/contacts/:uuid', async ({
    params, request,
  }) => {
    const uuid = params.uuid
    const body = await request.json() as ContactIndexDto
    const contactIndex = contacts.findIndex((c) => c.uuid === uuid)

    if (contactIndex === -1) {
      return new HttpResponse(null, { status: 404 })
    }

    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return HttpResponse.json(contacts[contactIndex])
  }),

  http.delete('*/api/v1/contacts/:uuid', ({ params }) => {
    const { uuid } = params
    const contactIndex = contacts.findIndex((c) => c.uuid === uuid)

    if (contactIndex === -1) {
      return new HttpResponse(null, { status: 404 })
    }

    contacts.splice(contactIndex, 1)

    return new HttpResponse(null, { status: 200 })
  }),
]
