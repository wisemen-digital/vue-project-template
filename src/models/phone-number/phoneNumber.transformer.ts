import { parsePhoneNumber } from 'libphonenumber-js'

import type { PhoneNumberDto } from '@/models/phone-number/phoneNumberDto.model.ts'

import { PhoneNumber } from './phoneNumber.model'

export class PhoneNumberTransformer {
  static toDto(phoneNumber: PhoneNumber): PhoneNumberDto {
    const {
      countryCallingCode,
      nationalNumber,
    } = parsePhoneNumber(phoneNumber)

    return {
      dialCode: countryCallingCode,
      number: nationalNumber,
    }
  }

  static toNullableDto(phoneNumber: PhoneNumber | null): PhoneNumberDto | null {
    if (phoneNumber === null) {
      return null
    }

    return this.toDto(phoneNumber)
  }

  static toNullablePhoneNumber(dto: PhoneNumberDto | null): PhoneNumber | null {
    if (dto === null) {
      return null
    }

    return this.toPhoneNumber(dto)
  }

  static toPhoneNumber(dto: PhoneNumberDto): PhoneNumber {
    return `${dto.dialCode}${dto.number}`
  }
}
