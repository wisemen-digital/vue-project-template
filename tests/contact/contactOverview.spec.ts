import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import { ContactDetailDtoBuilder } from '@/models/contact/detail/contactDetailDto.builder.ts'
import { ContactIndexDtoBuilder } from '@/models/contact/index/contactIndexDto.builder'
import { PaginationUtil } from '@/utils/pagination.util.ts'
import {
  expect,
  test,
} from '@@/base.fixture'

test('should display contacts in the overview table', async ({
  http,
  page,
  worker,
}) => {
  const CONTACT_1 = new ContactIndexDtoBuilder()
    .withFirstName('Charles')
    .withLastName('Doe')
    .withEmail('charles.doe@email.com')
    .withPhone('+1 234 567 890')
    .build()

  const CONTACT_2 = new ContactIndexDtoBuilder()
    .withFirstName('Nancy')
    .withLastName('Johnson')
    .withEmail('nancy.johnson@email.com')
    .withPhone('+1 987 654 321')
    .build()

  await worker.use(
    http.get('*/api/v1/contacts', () => {
      return HttpResponse.json(PaginationUtil.getJson([
        CONTACT_1,
        CONTACT_2,
      ]))
    }),
  )

  await page.goto('/contacts')

  // Check if the contacts are displayed in the table
  await expect(page.getByTestId(TEST_ID.CONTACTS.TABLE.EMAIL_LINK).first()).toContainText('charles.doe@email.com')
  await expect(page.getByTestId(TEST_ID.CONTACTS.TABLE.NAME_LINK).first()).toContainText('Charles Doe')
  await expect(page.getByTestId(TEST_ID.CONTACTS.TABLE.PHONE_LINK).first()).toContainText('+1 234 567 890')
})

test('should navigate to contact detail page when clicking on an entry in the overview table', async ({
  http,
  page,
  worker,
}) => {
  const CONTACT = new ContactIndexDtoBuilder()
    .withFirstName('Charles')
    .withLastName('Doe')
    .withEmail('charles.doe@email.com')
    .withPhone('+1 234 567 890')
    .build()

  const CONTACT_DETAIL = new ContactDetailDtoBuilder()
    .withFirstName('Charles')
    .withLastName('Doe')
    .withEmail('charles.doe@email.com')
    .withPhone('+1 234 567 890')
    .build()

  await worker.use(
    http.get('*/api/v1/contacts', () => {
      return HttpResponse.json(PaginationUtil.getJson([
        CONTACT,
      ]))
    }),
    http.get(`*/api/v1/contacts/:uuid`, () => {
      return HttpResponse.json(CONTACT_DETAIL)
    }),
  )

  await page.goto('/contacts')

  await page.getByRole('link', { name: 'Charles Doe' }).click()

  await expect(page).toHaveURL(`/contacts/${CONTACT.uuid}`)
})

test('should navigate to create page when pressing the create button', async ({
  http,
  page,
  worker,
}) => {
  await worker.use(
    http.get('*/api/v1/contacts', () => {
      return HttpResponse.json(PaginationUtil.getJson([]))
    }),
  )

  await page.goto('/contacts')

  await page.getByTestId(TEST_ID.CONTACTS.OVERVIEW.CREATE_BUTTON).click()

  await expect(page).toHaveURL(`/contacts/create`)
})
