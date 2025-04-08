import { HttpResponse } from 'msw'

import { TEST_ID } from '@/constants/testId.constant'
import { UuidUtil } from '@/utils/uuid.util'
import {
  expect,
  test,
} from '@@/base.fixture'

test('create a new contact', async ({
  http,
  page,
  worker,
}) => {
  const NEW_CONTACT_UUID = UuidUtil.getRandom()

  await worker.use(
    http.get(`*/api/v1/contacts/${NEW_CONTACT_UUID}`, () => {
      return HttpResponse.json({
        uuid: NEW_CONTACT_UUID,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        email: 'new.contact@email.com',
        firstName: 'New',
        lastName: 'Contact',
        phone: '+1 555 123 456',
      })
    }),
  )

  await page.goto('/contacts/create')

  // Fill in the contact information
  await page.getByTestId(TEST_ID.CONTACTS.FORM.FIRST_NAME_INPUT).fill('New')
  await page.getByTestId(TEST_ID.CONTACTS.FORM.LAST_NAME_INPUT).fill('Contact')
  await page.getByTestId(TEST_ID.CONTACTS.FORM.EMAIL_INPUT).fill('new.contact@email.com')
  await page.getByTestId(TEST_ID.CONTACTS.FORM.PHONE_INPUT).fill('+1 555 123 456')

  // Submit the form
  await page.getByTestId(TEST_ID.CONTACTS.FORM.SUBMIT_BUTTON).click()

  // Check for success toast
  await expect(page.getByTestId(TEST_ID.CONTACTS.CREATE.SUCCESS_TOAST)).toBeVisible()

  // Check if we're redirected to the detail page
  await expect(page.url()).toContain(`/contacts/${NEW_CONTACT_UUID}`)
})
