import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import { ContactDetailDtoBuilder } from '@/models/contact/detail/contactDetailDto.builder'
import {
  expect,
  test,
} from '@@/base.fixture'
import { InterceptorUtil } from '@@/utils/interceptor.util'

test('update contact information', async ({
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

  // Set up interceptor for the PUT request
  const updateInterceptor = await InterceptorUtil.put(page, `contacts/${CONTACT.uuid}`, {})

  await page.goto(`/contacts/${CONTACT.uuid}/update`)

  // Update the contact information
  await page.getByTestId(TEST_ID.CONTACTS.FORM.FIRST_NAME_INPUT).fill('Updated')
  await page.getByTestId(TEST_ID.CONTACTS.FORM.LAST_NAME_INPUT).fill('Contact')
  await page.getByTestId(TEST_ID.CONTACTS.FORM.EMAIL_INPUT).fill('updated.contact@email.com')
  await page.getByTestId(TEST_ID.CONTACTS.FORM.PHONE_INPUT).fill('+1 555 555 555')

  // Submit the form
  await page.getByTestId(TEST_ID.CONTACTS.FORM.SUBMIT_BUTTON).click()

  // Check if the update request was made
  expect(updateInterceptor.getCount()).toBe(1)

  // Check for success toast
  await expect(page.getByTestId(TEST_ID.CONTACTS.UPDATE.SUCCESS_TOAST)).toBeVisible()

  // Check if we're redirected to the detail page
  await expect(page.url()).toContain(`/contacts/${CONTACT.uuid}`)
})
