import type { ContactIndexDto } from '@/models/contact/index/contactIndexDto.model'
import { UuidUtil } from '@/utils/uuid.util'

export class ContactIndexDtoBuilder {
  value: ContactIndexDto = {
    uuid: UuidUtil.getRandom(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    email: 'john.doe@email.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 234 567 890',
  }

  constructor() {}

  build(): ContactIndexDto {
    return this.value
  }

  withEmail(email: string | null): ContactIndexDtoBuilder {
    this.value.email = email

    return this
  }

  withFirstName(firstName: string | null): ContactIndexDtoBuilder {
    this.value.firstName = firstName

    return this
  }

  withIsActive(isActive: boolean): ContactIndexDtoBuilder {
    this.value.isActive = isActive

    return this
  }

  withLastName(lastName: string | null): ContactIndexDtoBuilder {
    this.value.lastName = lastName

    return this
  }

  withPhone(phone: string | null): ContactIndexDtoBuilder {
    this.value.phone = phone

    return this
  }
}
