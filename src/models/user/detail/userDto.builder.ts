import { CalendarDateTransformer } from '@/models/date/calendarDate.transformer.ts'
import type { UserDto } from '@/models/user/detail/userDto.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { UuidUtil } from '@/utils/uuid.util.ts'

export class UserDtoBuilder {
  value: UserDto = {
    uuid: UuidUtil.getRandom<UserUuid>(),
    birthDate: CalendarDateTransformer.toDto(CalendarDateTransformer.fromDate(new Date())),
    firstName: 'John',
    lastName: 'Doe',
  }

  constructor() {}

  build(): UserDto {
    return this.value
  }

  withBirthDate(birthDate: string): UserDtoBuilder {
    this.value.birthDate = CalendarDateTransformer.toDto(CalendarDateTransformer.fromDate(new Date(birthDate)))

    return this
  }

  withFirstName(firstName: string): UserDtoBuilder {
    this.value.firstName = firstName

    return this
  }

  withLastName(lastName: string): UserDtoBuilder {
    this.value.lastName = lastName

    return this
  }

  withUuid(uuid: UserUuid): UserDtoBuilder {
    this.value.uuid = uuid

    return this
  }
}
