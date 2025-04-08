import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'
import { PaginationParamsBuilder } from '@wisemen/vue-core'

import {
  createContactV1,
  deleteContactV1,
  updateContactV1,
  viewContactDetailV1,
  viewContactIndexV1,
} from '@/client'
import {
  ContactIndexPaginationTransformer,
  ContactIndexTransformer,
  ContactTransformer,
} from '@/models/contact/contact.transformer'
import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactCreateForm } from '@/models/contact/create/contactCreateForm.model'
import type { ContactDetail } from '@/models/contact/detail/contactDetail.model'
import type { ContactIndex } from '@/models/contact/index/contactIndex.model'
import type { ContactIndexPagination } from '@/models/contact/index/contactIndexPagination.model'
import type { ContactUpdateForm } from '@/models/contact/update/contactUpdateForm.model'

export class ContactService {
  static async create(form: ContactCreateForm): Promise<ContactUuid> {
    const dto = ContactTransformer.createDtoFromForm(form)
    const response = await createContactV1({ body: dto })

    return response.data.uuid as ContactUuid
  }

  static async delete(contactUuid: ContactUuid): Promise<void> {
    await deleteContactV1({ path: { uuid: contactUuid } })
  }

  static async getAll(
    paginationOptions: PaginationOptions<ContactIndexPagination>,
  ): Promise<PaginatedData<ContactIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .build(ContactIndexPaginationTransformer.toDto)

    const response = await viewContactIndexV1({ query })

    return {
      data: response.data.items.map(ContactIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }

  static async getByUuid(contactUuid: ContactUuid): Promise<ContactDetail> {
    const response = await viewContactDetailV1({ path: { uuid: contactUuid } })

    return ContactTransformer.fromDto(response.data)
  }

  static async update(contactUuid: ContactUuid, form: ContactUpdateForm): Promise<void> {
    const dto = ContactTransformer.updateDtoFromForm(form)

    await updateContactV1({
      body: dto,
      path: { uuid: contactUuid },
    })
  }
}
