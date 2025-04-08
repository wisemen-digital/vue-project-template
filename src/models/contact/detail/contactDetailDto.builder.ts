import type { ContactUuid } from '@/models/contact/contactUuid.model'
import type { ContactDetailDto } from '@/models/contact/detail/contactDetailDto.model'
import { UuidUtil } from '@/utils/uuid.util'

export class ContactDetailDtoBuilder {
  value: ContactDetailDto = {
    uuid: UuidUtil.getRandom<ContactUuid>(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 234 567 890',
  }

  constructor() {}

  build(): ContactDetailDto {
    return this.value
  }

  withEmail(email: string | null): ContactDetailDtoBuilder {
    this.value.email = email

    return this
  }

  withFirstName(firstName: string | null): ContactDetailDtoBuilder {
    this.value.firstName = firstName

    return this
  }

  withIsActive(isActive: boolean): ContactDetailDtoBuilder {
    this.value.isActive = isActive

    return this
  }

  withLastName(lastName: string | null): ContactDetailDtoBuilder {
    this.value.lastName = lastName

    return this
  }

  withPhone(phone: string | null): ContactDetailDtoBuilder {
    this.value.phone = phone

    return this
  }

  withUuid(uuid: ContactUuid): ContactDetailDtoBuilder {
    this.value.uuid = uuid

    return this
  }
}
