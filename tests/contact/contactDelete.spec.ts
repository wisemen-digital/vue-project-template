import { HttpResponse } from 'msw'

import { ContactDetailDtoBuilder } from '@/models/contact/detail/contactDetailDto.builder'
import {
  expect,
  test,
} from '@@/base.fixture'
import { InterceptorUtil } from '@@/utils/interceptor.util'

test('delete a contact', async ({
  http,
  page,
  worker,
}) => {
  const CONTACT = new ContactDetailDtoBuilder().build()

  await worker.use(
    http.get(`*/api/v1/contacts/${CONTACT.uuid}`, () => {
      return HttpResponse.json(CONTACT)
    }),
    http.get('*/api/v1/contacts', () => {
      return HttpResponse.json({
        items: [],
        meta: {
          limit: 10,
          offset: 0,
          total: 0,
        },
      })
    }),
  )

  // Set up interceptor for the DELETE request
  const deleteInterceptor = await InterceptorUtil.delete(page, `contacts/${CONTACT.uuid}`, {})

  await page.goto(`/contacts/${CONTACT.uuid}`)

  // Click the delete button
  await page.locator('#delete-contact-button').click()

  // Check if the delete request was made
  expect(deleteInterceptor.getCount()).toBe(1)

  // Check if we're redirected to the contacts overview page
  await expect(page.url()).toContain('/contacts')
  await expect(page.url()).not.toContain(CONTACT.uuid)
})
