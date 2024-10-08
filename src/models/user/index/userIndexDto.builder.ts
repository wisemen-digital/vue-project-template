import { CalendarDateTransformer } from '@/models/date/calendarDate.transformer.ts'
import type { UserIndexDto } from '@/models/user/index/userIndexDto.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'

export class UserIndexDtoBuilder {
  value: UserIndexDto = {
    uuid: UuidUtil.getRandom<UserUuid>(),
    birthDate: CalendarDateTransformer.toDto(CalendarDateTransformer.fromDate(new Date())),
    firstName: 'John',
    lastName: 'Doe',
  }

  constructor() {}

  build(): UserIndexDto {
    return this.value
  }

  withBirthDate(birthDate: string): UserIndexDtoBuilder {
    this.value.birthDate = CalendarDateTransformer.toDto(CalendarDateTransformer.fromDate(new Date(birthDate)))

    return this
  }

  withFirstName(firstName: string): UserIndexDtoBuilder {
    this.value.firstName = firstName

    return this
  }

  withLastName(lastName: string): UserIndexDtoBuilder {
    this.value.lastName = lastName

    return this
  }

  withUuid(uuid: UserUuid): UserIndexDtoBuilder {
    this.value.uuid = uuid

    return this
  }
}
