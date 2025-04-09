import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import { ContactDetailDtoBuilder } from '@/models/contact/detail/contactDetailDto.builder'
import {
  expect,
  test,
} from '@@/base.fixture'

test('should display contact information in detail view', async ({
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
    http.get(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json(CONTACT)
    }),
  )

  await page.goto(`/contacts/${CONTACT.uuid}`)

  // Check if the contact details are displayed
  await expect(page).toContainText('Charles Doe')
  await expect(page).toContainText('charles.doe@email.com')
  await expect(page).toContainText('+1 234 567 890')
  await expect(page).toContainText('Active')
})

test('should navigate to the update page when clicking on the edit button', async ({
  http,
  page,
  worker,
}) => {
  const CONTACT = new ContactDetailDtoBuilder()
    .withFirstName('Charles')
    .withLastName('Doe')
    .withEmail('charles.doe@email.com')
    .withPhone('+1 234 567 890')
    .build()

  await worker.use(
    http.get(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json(CONTACT)
    }),
  )

  await page.goto(`/contacts/${CONTACT.uuid}`)

  await page.getByTestId(TEST_ID.CONTACTS.DETAIL.EDIT_BUTTON).click()

  await expect(page).toHaveURL(`/contacts/${CONTACT.uuid}/update`)
})
