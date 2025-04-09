import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import { ContactDetailDtoBuilder } from '@/models/contact/detail/contactDetailDto.builder'
import {
  expect,
  test,
} from '@@/base.fixture'

test('should update an existing contact information', async ({
  http,
  page,
  worker,
}) => {
  const CONTACT = new ContactDetailDtoBuilder()
    .withFirstName('Charles')
    .withLastName('Doe')
    .withEmail('charles.doe@email.com')
    .withPhone('+1 234 567 890')
    .withIsActive(true)
    .build()

  await worker.use(
    http.put(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json(CONTACT)
    }),
    http.get(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json(CONTACT)
    }),
  )

  await page.goto(`/contacts/${CONTACT.uuid}/update`)

  await page.getByRole('textbox', { name: 'First name' }).fill('Updated')
  await page.getByRole('textbox', { name: 'Last name' }).fill('Contact')
  await page.getByRole('textbox', { name: 'Email' }).fill('updated.contact@email.com')
  await page.getByRole('textbox', { name: 'Phone' }).fill('481293020')

  await page.getByTestId(TEST_ID.CONTACTS.FORM.SUBMIT_BUTTON).click()

  await expect(page).toHaveURL(`/contacts/${CONTACT.uuid}`)
})
