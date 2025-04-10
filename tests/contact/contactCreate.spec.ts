import { HttpResponse } from 'msw'

import { ContactDetailDtoBuilder } from '@/models/contact/detail/contactDetailDto.builder.ts'
import { test } from '@@/base.fixture'

test('should create a new contact', async ({
  http,
  page,
  worker,
}) => {
  const CONTACT = new ContactDetailDtoBuilder().build()

  await worker.use(
    http.get(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json(CONTACT)
    }),
    http.post(`*/api/v1/contacts`, () => {
      return HttpResponse.json(CONTACT)
    }),
  )

  await page.goto('/contacts/create')

  await page.getByRole('textbox', { name: 'First name' }).fill('New')
  await page.getByRole('textbox', { name: 'Last name' }).fill('Contact')
  await page.getByRole('textbox', { name: 'Email' }).fill('new.contact@email.com')
  await page.getByRole('textbox', { name: 'Phone' }).fill('481293020')
})
